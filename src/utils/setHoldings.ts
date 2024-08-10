import { THoldingAction, THoldingsReducer, TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';

function setHoldings(runData: TRunData, playerConfigs: TObjAny, dispatchHoldings: THoldingsReducer) {
  const { Stations } = runData;
  const { Character, PlayerType } = runData.Settings;	
  const { [Character]: { BaseMana, [PlayerType]: { Cards, Exhibit } } } = playerConfigs;
  
  // TODO: Junko, Patchu
  // TODO: read shining config -> baseMana

  // BaseMana
  {
    const action: THoldingAction = {
      type: 'BaseMana',
      change: {
        Type: 'Add',
        Station: {
          Act: 1,
          Level: 0,
          Y: 0
        },
        BaseMana: BaseMana
      }
    };
    dispatchHoldings(action);
  }

  // BaseDeck
  {
    for (const card of Cards) {
      const action: THoldingAction = {
        type: 'Card',
        change: {
          Type: 'Add',
          Station: {
            Act: 1,
            Level: 0,
            Y: 0
          },
          Id: card,
          IsUpgraded: false
        }
      };
      dispatchHoldings(action);
    }
  }

  // BaseExhibit
  {
    const action: THoldingAction = {
      type: 'Exhibit',
      change: {
        Type: 'Add',
        Station: {
          Act: 1,
          Level: 0,
          Y: 0
        },
        Id: Exhibit
      }
    };
    dispatchHoldings(action);
  }

  // Cards
  {
    const { Cards } = runData;
    for (const Card of Cards) {
      const card: any = JSON.parse(JSON.stringify(Card));
      card.Station = Stations[Card.Station].Node;
      const action: THoldingAction = {
        type: 'Card',
        change: {
          ...card
        }
      };
      dispatchHoldings(action);
    }
  }

  // Exhibits
  {
    const { Exhibits } = runData;
    for (const Exhibit of Exhibits) {
      const exhibit: any = JSON.parse(JSON.stringify(Exhibit));
      exhibit.Station = Stations[Exhibit.Station].Node;
      const action: THoldingAction = {
        type: 'Exhibit',
        change: {
          ...exhibit
        }
      };
      dispatchHoldings(action);
    }
  }
}

export default setHoldings;