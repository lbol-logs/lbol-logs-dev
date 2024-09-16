import { TObj, TObjNumber } from 'utils/types/common';
import { TBattleStatus } from 'utils/types/runData';
import { HpWidget, PowerImage } from '../../parts/stationWidgets';
import { getValuWithChange } from '../../parts/statuses';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getStationImage } from 'utils/functions/getImage';

function BattleStatusWidget({ status, lastStatus }: { status: TBattleStatus, lastStatus: TObjNumber }) {
  const { t } = useTranslation();

  const { Hp, Block, Barrier, Power } = status;
  const {
    Hp: lastHp,
    Block: lastBlock,
    Barrier: lastBarrier,
    Power: lastPower
  } = lastStatus;

  let power = null;
  if (Power !== undefined) {
    power = (
      <div className="p-battle-details__status">
        <PowerImage />
        {getValuWithChange(Power, lastPower)}
      </div>
    );
  }

  return (
    <div className="p-battle-details__statuses">
      <div className="p-battle-details__status">
        <HpWidget hp={Hp} lastHp={lastHp} />
      </div>
      <div className="p-battle-details__status">
        <span className="p-battle-details__defense">
          <LazyLoadImage2 className="p-battle-details__block" callback={getStationImage} name="Block" alt={t('block', { ns: 'log' })} />
        </span>
        {getValuWithChange(Block, lastBlock)}
      </div>
      <div className="p-battle-details__status">
        <span className="p-battle-details__defense">
          <LazyLoadImage2 className="p-battle-details__barrier" callback={getStationImage} name="Block" alt={t('barrier', { ns: 'log' })} />
        </span>
        {getValuWithChange(Barrier, lastBarrier)}
      </div>
      {power}
    </div>
  );
}

export default BattleStatusWidget;