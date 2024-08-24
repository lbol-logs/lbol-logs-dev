import { TRewards, TStation } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyWidget } from '../parts/stationWidgets';

function BattleStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { Data, Id } = station;

  const { Rewards } = station;
  const { Money } = Rewards as TRewards || {};

  let money = null;

  if (Rewards) {
    money = (
      <span className="c-station__money">
        <MoneyWidget />
        {Money}
      </span>
    );
  }

  const enemies = configsData.enemyGroups[Id as string];

  const { Rounds } = Data;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <EnemyCards enemies={enemies} />
        <div className="c-station__stats">
          <RoundsWidget rounds={Rounds} />
          {money}
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default BattleStation;