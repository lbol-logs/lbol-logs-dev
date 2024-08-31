import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStationImage } from 'utils/functions/getImage';
import { getValuWithChange } from './statuses';

function HpWidget({ hp, lastHp, maxHp, lastMaxHp }: { hp: number, lastHp: number | undefined, maxHp?: number, lastMaxHp?: number }) {
  const { t } = useTranslation();

  let hpImage;
  let MaxHp = null;
  if (maxHp) {
    const hpRatio = Math.floor(100 * hp / maxHp);
    if (hpRatio >= 70) hpImage = 'Hp1';
    else if (hpRatio >= 30) hpImage = 'Hp2';
    else hpImage = 'Hp3';

    MaxHp = (
      <>
        /{getValuWithChange(maxHp, lastMaxHp)}
      </>
    );
  }
  else {
    hpImage = 'Hp1';
  }

  return (
    <>
      <LazyLoadImage2 callback={getStationImage} name={hpImage} alt={t('hp', { ns: 'log' })} />
      {getValuWithChange(hp, lastHp)}{MaxHp}
    </>
  );
}

function PowerImage() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getStationImage} name="Power" alt={t('power', { ns: 'log' })} />;
}

function MoneyImage() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getStationImage} name="Money" alt={t('money', { ns: 'log' })} />;
}

function RoundImage() {
  const { t } = useTranslation();

  return <LazyLoadImage2 callback={getStationImage} name="Round" alt={t('round', { ns: 'log' })} />;
}

function RevealImage() {
  return <LazyLoadImage2 className="c-dialogue__tips-icon" callback={getStationImage} name="Reveal" alt="" />;
}

export {
  HpWidget,
  PowerImage,
  MoneyImage,
  RoundImage,
  RevealImage
};