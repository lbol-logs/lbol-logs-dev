import { eventConvertBaseMana, ExhibitWithCounter, requestWithStartCard, RequestWithStartCard, TActObj, THoldingAction, THoldingChange, THoldingsReducer, TNode, TNodeObj, TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';
import copyObject from 'utils/functions/helpers';

function setHoldings(runData: TRunData, playerConfigs: TObjAny, dispatchHoldings: THoldingsReducer, exhibitConfigs: TObjAny) {
  const { Stations } = runData;
  const { Character, PlayerType } = runData.Settings;
  const { BaseMana, [PlayerType]: { Cards, Exhibit } } = playerConfigs[Character];

  // TODO: Junko, Patchu
  // TODO: read shining config -> baseMana

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

    if (runData.Settings.Requests.includes(RequestWithStartCard.StartMisfortune.toString())) {
      const Id = requestWithStartCard.StartMisfortune;
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
  const stationsTiangouYuyi: TObjAny = {};
  {
    const { Exhibits } = runData;
    for (const Exhibit of Exhibits) {
      const exhibit: any = copyObject(Exhibit);
      const { Id, Type, Station } = Exhibit;
      const { Node } = Stations[Station];
      exhibit.Station = Node;
      if (Exhibit.Id === ExhibitWithCounter.TiangouYuyi) {
        if (Type === 'Add') {
          stationsTiangouYuyi.start = Station;
          ignoredPaths.push({ Type, Station: Node });
        }
        else if (Type === 'Remove') {
          stationsTiangouYuyi.end = Station;
          ignoredPaths.push({ Type, Station: Node });
        }
      }
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          ...exhibit
        }
      };
      actions.push(action);

      // TODO: Shining Exhibit BaseMana
      const { Rarity, BaseMana } = exhibitConfigs[Id];
      if (Rarity === 'Shining') {
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

  // TiangouYuyi
  {
    const { start, end} = stationsTiangouYuyi;
    for (let i = start; i <= end || Stations.length - 1; i++) {
      const nextStation = Stations[i + 1];
      if (!nextStation) break;
      const { Node } = Stations[i];
      const { Act, Level, Y } = Node;
      if (Act !== nextStation.Node.Act) continue;
      const { Nodes } = runData.Acts.find(({ Act: _act }) => Act === _act) as TActObj;
      const { Followers } = Nodes.find(({ X, Y: _y }) => X === Level && Y === _y) as TNode;
      if (!Followers.includes(nextStation.Node.Y)) {
        const Type = 'Use'
        const action: THoldingAction = {
          type: 'Exhibit',
          change: {
            Id: ExhibitWithCounter.TiangouYuyi,
            Type,
            Station: Node
          }
        };
        actions.push(action);
        ignoredPaths.push({ Type, Station: Node });
      }
    }
  }

  // JunkoColorless, PatchouliPhilosophy
  {
    const stations = Stations.filter(({ Data }) => Data && Data.BaseMana);
    for (const station of stations) {
      const { Id, Node, Data: { BaseMana } } = station;

      {
        const action: THoldingAction = {
          type: 'BaseMana',
          change: {
            Type: 'Remove',
            Station: Node,
            BaseMana
          }
        };
        actions.push(action);
      }

      {
        const BaseMana = eventConvertBaseMana[Id as keyof typeof eventConvertBaseMana];
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
    const currentActions = actions.filter(({ change: { Station: { Act: _act, Level: _level } }}) => Act === _act && Level === _level);
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