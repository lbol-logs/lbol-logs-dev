import { THoldingAction, THoldingsReducer, TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';

function setHoldings(runData: TRunData, playerConfigs: TObjAny, dispatchHoldings: THoldingsReducer) {
  // TODO: read config

  const { Stations } = runData;
  const { Character, PlayerType } = runData.Settings;	
  const playerConfig = playerConfigs[Character][PlayerType];
  const { Cards, Exhibit } = playerConfig;
  
  // TODO: Junko, Patchu
  // TODO: BaseMana Change

  const action: THoldingAction = {
    type: 'Cards',
    change: {
      Type: 'Add',
      Station: {
        Act: 1,
        Level: 0,
        Y: 0
      },
      Id: 'Shoot',
      IsUpgraded: false
    }
  };
  dispatchHoldings(action);
}

export default setHoldings;