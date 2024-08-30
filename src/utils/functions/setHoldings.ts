import { ExhibitsWithCounter, RequestTypes, THoldingAction, THoldingChange, THoldingsReducer, TNodeObj, TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';
import { copyObject, getBaseMana } from 'utils/functions/helpers';

function setHoldings({ runData, dispatchHoldings, characterConfigs, exhibitConfigs, requestConfigs }: { runData: TRunData, dispatchHoldings: THoldingsReducer, characterConfigs: TObjAny, exhibitConfigs: TObjAny, requestConfigs: TObjAny }) {
  const { Stations } = runData;
  const { Character, PlayerType } = runData.Settings;
  const { BaseMana, [PlayerType]: { Cards, Exhibit } } = characterConfigs[Character];

  // TODO: Junko, Patchu

  const actions = [];
  const ignoredPaths: Array<THoldingChange> = [];
  const Station: TNodeObj = {
    Act: 1,
    Level: 0,
    Y: 0
  };

  // BaseBaseMana
  {
    const action: THoldingAction = {
      type: 'BaseMana',
      change: {
        Type: 'Add',
        Station,
        BaseMana
      }
    };
    actions.push(action);
  }

  // BaseDeck
  // eslint-disable-next-line no-lone-blocks
  {
    for (const card of Cards) {
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

    const StartMisfortune = RequestTypes.StartMisfortune.toString();
    if (runData.Settings.Requests.includes(StartMisfortune)) {
      const Id = requestConfigs[StartMisfortune];
      const action: THoldingAction = {
        type: 'Card',
        change: {
          Type: 'Add',
          Station,
          Id,
          IsUpgraded: false
        }
      };
      actions.push(action);
    }
  }

  // BaseExhibit
  // eslint-disable-next-line no-lone-blocks
  {
    {
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          Type: 'Add',
          Station,
          Id: Exhibit
        }
      };
      actions.push(action);
    }

    {
      const { BaseMana } = exhibitConfigs[Exhibit];
      const action: THoldingAction = {
        type: 'BaseMana',
        change: {
          Type: 'Add',
          Station,
          BaseMana
        }
      };
      actions.push(action);
    }
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
    const { Exhibits } = runData;
    for (const Exhibit of Exhibits) {
      const exhibit: any = copyObject(Exhibit);
      const { Id, Type, Station } = Exhibit;
      const { Node } = Stations[Station];
      exhibit.Station = Node;

      const { BaseMana, Counter } = exhibitConfigs[Id];
      if (Counter && Type === 'Add') {
        exhibit.Counter = Counter;
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

      if (BaseMana) {
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
        const BaseMana = getBaseMana(Id);
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