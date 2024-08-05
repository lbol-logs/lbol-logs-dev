import { useTranslation } from 'react-i18next';
import { TStatus } from 'utils/types/runData';

function Statuses({ status, lastStatus }: { status: TStatus, lastStatus: TStatus }) {
  useTranslation();

  // const { Money, Hp, MaxHp, Power, MaxPower } = status;

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
            (
              <span className={className}>
                {isPositive && '+'}{diff}
              </span>
            )
          </span>
        );
      }
    }

    return (
      <>
        <span className="c-status">{value}</span>
        {change}
      </>
    );
  }
  
  return (
    <>
      <div className="p-station__status p-station__status--hp">
        HP: {getValuWithChange('Hp')}/{getValuWithChange('MaxHp')}
      </div>
      <div className="p-station__status p-station__status--power">
        Power: {getValuWithChange('Power')}/{getValuWithChange('MaxPower')}
      </div>
      <div className="p-station__status p-station__status--money">
        Money: {getValuWithChange('Money')}
      </div>
    </>
  );
}

export default Statuses;