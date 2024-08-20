import { TRewards, TStation } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyWidget } from '../parts/statuses';

function BattleStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { Data, Id } = station;

  const { Rewards } = station;
  const { Money } = Rewards as TRewards || {};

  let money = null;

  if (Rewards) {
    money = (
      <span className="p-entity__money">
        {/* <LazyLoadImage2 callback={getCommonImage} name={'Money'} alt={t('money', { ns: 'log' })} /> */}
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
        <div className="p-entity">
          <RoundsWidget rounds={Rounds} />
          {money}
        </div>
      </div>
      <div className="p-entities">
        <RewardsWidget station={station} />
      </div>
    </div>
  );
}

export default BattleStation;