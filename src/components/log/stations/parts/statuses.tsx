import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage } from 'utils/functions/getImage';
import { TStatus } from 'utils/types/runData';

function Statuses({ status, lastStatus }: { status: TStatus, lastStatus: TStatus }) {
  const { t } = useTranslation();

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
            {'('}
            <span className={className}>
              {isPositive && '+'}{diff}
            </span>
            {')'}
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

  let hpImage;
  const hpRatio = Math.floor(100 * Hp / MaxHp);
  if (hpRatio >= 70) hpImage = 'Hp1';
  else if (hpRatio >= 30) hpImage = 'Hp2';
  else hpImage = 'Hp3';

  return (
    <div className="p-station__statuses">
      <div className="p-station__status p-station__status--hp">
        <LazyLoadImage2 callback={getCommonImage} name={hpImage} alt={t('hp', { ns: 'log' })} />
        {getValuWithChange('Hp')}/{getValuWithChange('MaxHp')}
      </div>
      <div className="p-station__status p-station__status--power">
        <Power />
        {getValuWithChange('Power')}/{getValuWithChange('MaxPower')}
      </div>
      <div className="p-station__status p-station__status--money">
        <Money />
        {getValuWithChange('Money')}
      </div>
    </div>
  );
}

function Power() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getCommonImage} name={'Power'} alt={t('power', { ns: 'log' })} />;
}

function Money() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getCommonImage} name={'Money'} alt={t('money', { ns: 'log' })} />;
}

export default Statuses;

export {
  Power,
  Money
};