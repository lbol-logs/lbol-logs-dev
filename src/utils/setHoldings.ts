import { THoldingAction, THoldingsReducer, TRunData } from 'utils/types/runData';

function setHoldings(runData: TRunData, dispatchHoldings: THoldingsReducer) {
  // TODO: read config
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