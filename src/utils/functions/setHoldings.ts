import { CardsWithUpgradeCounter, ExhibitsWithCounter, RequestType, SpecialExhibit, TBaseManaObj, TCard, THoldingAction, THoldingChange, THoldingsReducer, TNodeObj, TRunData, TStation } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';
import { copyObject, getSameCardIndex, isSameStation } from 'utils/functions/helpers';
import Configs from 'utils/classes/Configs';
import BMana from 'utils/classes/BMana';

function setHoldings({ runData, dispatchHoldings, charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs }: { runData: TRunData, dispatchHoldings: THoldingsReducer, charactersConfigs: Configs, exhibitsConfigs: Configs, requestsConfigs: Configs, eventsConfigs: TObjAny }) {
  const { Stations } = runData;
  const { Character, PlayerType, JadeBoxes } = runData.Settings;
  const { BaseMana, [PlayerType]: { Cards, Exhibit } } = charactersConfigs.get(Character) || { [PlayerType]: { Cards: [], Exhibit: '' } };

  const actions: Array<THoldingAction> = [];
  const ignoredPaths: Array<THoldingChange> = [];
  const Station: TNodeObj = {
    Act: 1,
    Level: 0,
    Y: 0
  };

  const shinings: Array<THoldingAction> = [];

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
      const Exhibit = Exhibits[i];
      const exhibit: any = copyObject(Exhibit);
      const { Id, Type, Station: station } = Exhibit;
      const currentStation = Stations[station];
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

      {
        const action: THoldingAction = {
          type: 'BaseMana',
          change: {
            Type,
            Station: Node,
            BaseMana
          }
        };
        if (i <= 1 && Stations[0].Data.Choices[0] === 1) shinings.push(action);
        else actions.push(action);
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

  let main = 'A'
  let sub = 'A';
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
      if (Cards.length) {
        finalCards = Cards;
      }
      else {
        const { Cards } = runData.Result;
        const currentCards = copyObject(Cards);
        const cardsActions = actions.filter(({ type }) => type === 'Card').reverse();

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
        finalCards = currentCards.map(({ Id }) => Id);

        for (const id of finalCards) {
          const m = id.match(/Attack([WUBRGC])$/);
          if (m) {
            main = m[1];
            break;
          }
        }
        for (const id of finalCards) {
          const m = id.match(/Block([WUBRGC])$/);
          if (m) {
            sub = m[1];
            break;
          }
        }
      }

      for (const card of finalCards) {
        const action: THoldingAction = {
          type: 'Card',
          change: {
            Type: 'Add',
            Station,
            Id: card,
            IsUpgraded: false
          }
        };
        actions.push(action);
      }
    }

    if (isStartMisfortune) actions.push(startMisfortuneAction);
  }

  // BaseBaseMana
  {
    // let finalBaseMana: string;
    // if (BaseMana) {
    //   finalBaseMana = BaseMana;
    // }
    // else  {
    //   const { BaseMana } = runData.Result;
    //   let currentBaseMana = BaseMana;
    //   const baseManaActions = actions.filter(({ type }) => type === 'BaseMana').reverse();
    //   for (const action of baseManaActions) {
    //     const { Type, BaseMana: baseMana } = action.change as TBaseManaObj & THoldingChange;
    //     if (Type === 'Remove') {
    //       currentBaseMana = BMana.add(currentBaseMana, baseMana);
    //     }
    //     else if (Type === 'Add') {
    //       currentBaseMana = BMana.remove(currentBaseMana, baseMana);
    //     }
    //   }
    //   finalBaseMana = currentBaseMana;
    // }

    const finalBaseMana = BaseMana || `${main}${main}${sub}${sub}`;

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
    const finalExhibit = Exhibit || `${Character}${PlayerType}`;
    {
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          Type: 'Add',
          Station,
          Id: finalExhibit
        }
      };
      actions.push(action);
    }

    let baseMana;
    if (JadeBoxes !== undefined && JadeBoxes.includes('TwoColorStart')) {
      baseMana = 'P';
    }
    else if (BaseMana) {
      ({ BaseMana: baseMana } = exhibitsConfigs.get(Exhibit));
    }
    else {
      baseMana = main;
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

    if (!BaseMana) {
      (shinings[0].change as TBaseManaObj & THoldingChange).BaseMana = main;
    }
    for (const action of shinings) actions.push(action);
  }

  const sortedActions: Array<THoldingAction> = [];
  // Add missing stations
  for (const { Node: { Act, Level, Y } } of Stations) {
    const currentActions = actions.filter(({ change: { Station: { Act: _act, Level: _level } } }) => Act === _act && Level === _level);
    if (currentActions.length) {
      sortedActions.push(...currentActions);
    }
    else {
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

  for (const action of sortedActions) {
    dispatchHoldings(action);
  }

  return ignoredPaths;
}

export default setHoldings;