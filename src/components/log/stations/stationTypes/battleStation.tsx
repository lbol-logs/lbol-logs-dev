import { TRewards, TStation } from 'utils/types/runData';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyImage } from '../parts/stationWidgets';
import { enemiesShowDetails } from 'configs/globals';
import BattleDetails from '../battleDetails';

function BattleStation({ station }: { station: TStation }) {
  const { runData: { Stations } } = useContext(LogContext);
  const { Data, Id } = station;

  const { Rewards } = station;
  const { Money } = Rewards as TRewards || {};

  let money = null;
  let details = null;

  if (Rewards && Money) {
    money = (
      <span className="c-station__money">
        <MoneyImage />
        {Money}
      </span>
    );
  }

  const id = Id as string;

  if (enemiesShowDetails.includes(id)) {
    const { Details } = Data;
    if (Details) {
      const { Act: a, Level: l } = station.Node;
      const currentStationIndex = Stations.findIndex(({ Node: { Act, Level } }) => Act === a && Level === l);
      const { Status } = Stations[currentStationIndex - 1];
      details = <BattleDetails details={Details} enemy={id} status={Status} />;
    }
  }

  const { Rounds } = Data;

  return (
    <div className="p-station__body">
      <div className="p-station__main p-station__main--battle">
        <EnemyCards id={id} />
        <div className="c-station__stats">
          <RoundsWidget rounds={Rounds} />
          {money}
        </div>
      </div>
      {details}
      <RewardsWidget station={station} />
    </div>
  );
}

export default BattleStation;