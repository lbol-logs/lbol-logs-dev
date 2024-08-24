import { TStatus } from 'utils/types/runData';
import { HpImage, MoneyImage, PowerImage } from './stationImages';

function Statuses({ status, lastStatus }: { status: TStatus, lastStatus: TStatus }) {
  const { Hp, MaxHp } = status;

  function getValuWithChange(key: keyof TStatus) {
    const value: number = status[key];
    let change;
    if (lastStatus) {
      const lastValue = lastStatus[key];
      const diff = value - lastValue;
      if (diff) {
        const isPositive = diff > 0;
        const className = isPositive ? 'c-status__change--positive' : 'c-status__change--negative';
        change = (
          <span className="c-status__change">
            <span className={className}>
              {isPositive && '+'}{diff}
            </span>
          </span>
        );
      }
    }

    return (
      <span className="c-status">
        {value}
        {change}
      </span>
    );
  }

  let hpImage;
  const hpRatio = Math.floor(100 * Hp / MaxHp);
  if (hpRatio >= 70) hpImage = 'Hp1';
  else if (hpRatio >= 30) hpImage = 'Hp2';
  else hpImage = 'Hp3';

  return (
    <div className="p-station__statuses">
      <div className="p-station__status p-station__status--hp">
        <HpImage hpImage={hpImage} />
        {getValuWithChange('Hp')}/{getValuWithChange('MaxHp')}
      </div>
      <div className="p-station__status p-station__status--power">
        <PowerImage />
        {getValuWithChange('Power')}/{getValuWithChange('MaxPower')}
      </div>
      <div className="p-station__status p-station__status--money">
        <MoneyImage />
        {getValuWithChange('Money')}
      </div>
    </div>
  );
}

export default Statuses;