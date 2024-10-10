import { CardsWithUpgradeCounter, ExhibitsWithCounter, RequestType, SpecialExhibit, TBaseManaObj, TCard, THoldingAction, THoldingChange, THoldingsReducer, TNodeObj, TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';
import { copyObject, getSameCardIndex } from 'utils/functions/helpers';
import Configs from 'utils/classes/Configs';
import BMana from 'utils/classes/BMana';

function setHoldings({ runData, dispatchHoldings, charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs }: { runData: TRunData, dispatchHoldings: THoldingsReducer, charactersConfigs: Configs, exhibitsConfigs: Configs, requestsConfigs: Configs, eventsConfigs: TObjAny }) {
  const { Stations } = runData;
  const { Character, PlayerType, JadeBoxes } = runData.Settings;
  const { BaseMana, [PlayerType]: { Cards, Exhibit } } = charactersConfigs.get(Character) || { [PlayerType]: {} };

  const actions: Array<THoldingAction> = [];
  const ignoredPaths: Array<THoldingChange> = [];
  const Station: TNodeObj = {
    Act: 1,
    Level: 0,
    Y: 0
  };

  let isSwapping = false;
  if (Stations[0] && Stations[0].Data.Choices[0] === 1) isSwapping = true;;
  const attackOrder = 2;

  function sortActions({ actions, Type, addMissing = false }: { actions: Array<THoldingAction>, Type?: string, addMissing?: boolean }) {
    const sortedActions: Array<THoldingAction> = [];
    const _actions = Type ? actions.filter(({ type }) => type === Type) : actions;
    for (const { Node: { Act, Level, Y } } of Stations) {
      const currentActions = _actions.filter(({ change: { Station: { Act: _act, Level: _level } } }) => Act === _act && Level === _level);
      if (currentActions.length) {
        sortedActions.push(...currentActions);
      }
      else {
        if (!addMissing) continue;

        const currentAction: THoldingAction = {
          type: '',
          change: {
            Type: 'Add',
            Station: {
              Act,
              Level,
              Y
            }
          }
        };
        sortedActions.push(currentAction);
      }
    }
    return sortedActions;
  }

  // Cards
  {
    const { Cards } = runData;
    for (const Card of Cards) {
      const card: any = copyObject(Card);
      card.Station = Stations[Card.Station].Node;
      const action: THoldingAction = {
        type: 'Card',
        change: {
          ...card
        }
      };
      actions.push(action);
    }
  }

  // Exhibits
  {
    if (JadeBoxes !== undefined && JadeBoxes.includes('StartWithJingjie')) {
      const Id = SpecialExhibit.JingjieGanzhiyi.toString();
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          Type: 'Add',
          Station,
          Id
        }
      };
      actions.push(action);
    }

    const { Exhibits } = runData;
    for (let i = 0; i < Exhibits.length; i++) {
      const isDoingSwapping = isSwapping && i < 2;
      if (isDoingSwapping) continue;

      const Exhibit = Exhibits[i];
      const exhibit: any = copyObject(Exhibit);
      const { Id, Type, Station } = Exhibit;
      const currentStation = Stations[Station];
      const { Node } = currentStation;
      exhibit.Station = Node;

      const { BaseMana, InitialCounter } = exhibitsConfigs.get(Id);
      if (InitialCounter && Type === 'Add') {
        exhibit.Counter = InitialCounter;
      }

      if (Id === ExhibitsWithCounter.TiangouYuyi) {
        ignoredPaths.push({ Type, Station: Node });
      }

      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          ...exhibit
        }
      };
      actions.push(action);

      if (BaseMana !== undefined) {
        const action: THoldingAction = {
          type: 'BaseMana',
          change: {
            Type,
            Station: Node,
            BaseMana
          }
        };
        actions.push(action);
      }
    }
  }

  // JunkoColorless, PatchouliPhilosophy
  {
    const stations = Stations.filter(({ Data }) => Data && Data.BaseMana);
    for (const station of stations) {
      const { Id, Node, Data: { Color } } = station;
      if (!Color) continue;

      {
        const action: THoldingAction = {
          type: 'BaseMana',
          change: {
            Type: 'Remove',
            Station: Node,
            BaseMana: Color
          }
        };
        actions.push(action);
      }

      {
        const BaseMana = eventsConfigs.get(Id as string).mana;
        const action: THoldingAction = {
          type: 'BaseMana',
          change: {
            Type: 'Add',
            Station: Node,
            BaseMana
          }
        };
        actions.push(action);
      }
    }
  }

  // BaseDeck
  // eslint-disable-next-line no-lone-blocks
  {
    const StartMisfortune = RequestType.StartMisfortune.toString();
    const isStartMisfortune = runData.Settings.Requests.includes(StartMisfortune);
    let startMisfortuneAction: THoldingAction = {} as THoldingAction;
    if (isStartMisfortune) {
      const Id = requestsConfigs.get(StartMisfortune);
      startMisfortuneAction = {
        type: 'Card',
        change: {
          Type: 'Add',
          Station,
          Id,
          IsUpgraded: false
        }
      };
    }

    if (!(JadeBoxes !== undefined && (JadeBoxes.includes('Start50') || JadeBoxes.includes('SelectCard')))) {
      let finalCards: Array<string>;
      if (Cards !== undefined) {
        finalCards = Cards;
      }
      else {
        const { Cards } = runData.Result;
        const currentCards = copyObject(Cards);
        const cardsActions = sortActions({ actions, Type: 'Card' }).reverse();

        if (isStartMisfortune) cardsActions.push(startMisfortuneAction);
        for (const action of cardsActions) {
          const card = action.change as TCard & THoldingChange;
          const { Type } = card;
          if (Type === 'Remove') {
            currentCards.push(card);
          }
          else if (Type === 'Add') {
            const index = getSameCardIndex(currentCards, card);
            currentCards.splice(index, 1);
          }
          else if (Type === 'Upgrade') {
            const index = getSameCardIndex(currentCards, card);
            const { Id } = card;
            if (Id === CardsWithUpgradeCounter.YuyukoSing) {
              const { UpgradeCounter } = card;
              (currentCards[index].UpgradeCounter as number)--;
              if (UpgradeCounter === 1) currentCards[index].IsUpgraded = false;
            }
            else {
              currentCards[index].IsUpgraded = false;
            }
          }
        }
        finalCards = currentCards.map(({ Id }) => Id).sort((a, b) => {
          const i = getSortIndex(a);
          const j = getSortIndex(b);
          return i - j;
        });
      }

      if (isStartMisfortune) actions.unshift(startMisfortuneAction);

      for (const card of finalCards.reverse()) {
        const action: THoldingAction = {
          type: 'Card',
          change: {
            Type: 'Add',
            Station,
            Id: card,
            IsUpgraded: false
          }
        };
        actions.unshift(action);
      }
    }
  }

  function getSortIndex(id: string) {
    const isAttack = id.match(/Attack([WUBRG])$/);
    const isBlock = id.match(/Block([WUBRG])$/);
    const isShoot = id === 'Shoot';
    const isBoundary = id === 'Boundary';
    const order: Array<boolean> = [isShoot, isBoundary, Boolean(isAttack), Boolean(isBlock)];
    let i = order.indexOf(true);
    if (i === -1) i = attackOrder + 0.5;
    return i;
  }

  // BaseBaseMana
  {
    let finalBaseMana: string;
    if (BaseMana) {
      finalBaseMana = BaseMana;
    }
    else  {
      try {
        const { BaseMana } = runData.Result;
        let currentBaseMana = BaseMana;
        const baseManaActions = sortActions({ actions, Type: 'BaseMana' }).reverse();
        for (const action of baseManaActions) {
          const { Type, BaseMana: baseMana } = action.change as TBaseManaObj & THoldingChange;
          if (Type === 'Remove') {
            currentBaseMana = BMana.add(currentBaseMana, baseMana);
          }
          else if (Type === 'Add') {
            currentBaseMana = BMana.remove(currentBaseMana, baseMana);
          }
        }
        finalBaseMana = currentBaseMana;
      }
      catch (e) {
        console.error(e);
        let fifthBaseMana = 'N';
        if (isSwapping) {
          const { Exhibits } = runData;
          const Exhibit = Exhibits[1];
          const { Id } = Exhibit;
          const { BaseMana } = exhibitsConfigs.get(Id);
          if (BaseMana !== undefined) fifthBaseMana = BaseMana;
        }
        finalBaseMana = BMana.add('AAAA', fifthBaseMana);
      }
    }

    const action: THoldingAction = {
      type: 'BaseMana',
      change: {
        Type: 'Add',
        Station,
        BaseMana: finalBaseMana
      }
    };
    actions.push(action);
  }

  // BaseExhibit
  // eslint-disable-next-line no-lone-blocks
  {
    let finalExhibit = Exhibit;
    if (Exhibit === undefined) {
      if (isSwapping) finalExhibit = runData.Exhibits[0].Id;
      else finalExhibit = runData.Result.Exhibits[0];
    }

    {
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          Type: 'Add',
          Station,
          Id: finalExhibit
        }
      };
      actions.unshift(action);
    }

    if (BaseMana) {
      let baseMana;
      if (JadeBoxes !== undefined && JadeBoxes.includes('TwoColorStart')) {
        baseMana = 'P';
      }
      else {
        ({ BaseMana: baseMana } = exhibitsConfigs.get(Exhibit));
      }

      const action: THoldingAction = {
        type: 'BaseMana',
        change: {
          Type: 'Add',
          Station,
          BaseMana: baseMana
        }
      };
      actions.push(action);

      if (isSwapping) {
        const { Exhibits } = runData;
        for (let i = 0; i < 2; i++) {
          const Exhibit = Exhibits[i];
          const exhibit: any = copyObject(Exhibit);
          const { Id, Type } = Exhibit;
          exhibit.Station = Station;
    
          let { BaseMana } = exhibitsConfigs.get(Id);
          if (BaseMana === undefined) BaseMana = 'N';
    
          {
            const action: THoldingAction = {
              type: 'Exhibit',
              change: {
                ...exhibit
              }
            };
            actions.push(action);
          }

          {
            const action: THoldingAction = {
              type: 'BaseMana',
              change: {
                Type,
                Station,
                BaseMana
              }
            };
            actions.push(action);
          }
        }
      }
    }
  }

  // Add missing stations
  const sortedActions = sortActions({ actions, addMissing: true });

  for (const action of sortedActions) {
    dispatchHoldings(action);
  }

  return ignoredPaths;
}

export default setHoldings;