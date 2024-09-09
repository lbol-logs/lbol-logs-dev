import { TStatus } from 'utils/types/runData';
import { HpWidget, MoneyImage, PowerImage } from './stationWidgets';

function StatusWidget({ status, lastStatus }: { status: TStatus, lastStatus: TStatus }) {
  if (!status) return null;
  
  const { Hp, MaxHp } = status;

  const _getValuWithChange = (key: keyof TStatus) => {
    const value: number = status[key];
    const lastValue = lastStatus &&  lastStatus[key];
    return getValuWithChange(value, lastValue);
  };

  const lastHp = lastStatus && lastStatus.Hp;
  const lastMaxHp = lastStatus && lastStatus.MaxHp;

  return (
    <div className="p-station__statuses">
      <div className="p-station__status p-station__status--hp">
        <HpWidget hp={Hp} lastHp={lastHp} maxHp={MaxHp} lastMaxHp={lastMaxHp} />
      </div>
      <div className="p-station__status p-station__status--power">
        <PowerImage />
        {_getValuWithChange('Power')}/{_getValuWithChange('MaxPower')}
      </div>
      <div className="p-station__status p-station__status--money">
        <MoneyImage />
        {_getValuWithChange('Money')}
      </div>
    </div>
  );
}

export default StatusWidget;

function getValuWithChange(value: number, lastValue: number | undefined) {
  let change;
  if (lastValue) {
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

export {
  getValuWithChange
};