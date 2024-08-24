import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStationImage } from 'utils/functions/getImage';

function HpWidget({ hpImage }: { hpImage: string }) {
  const { t } = useTranslation();

  return <LazyLoadImage2 callback={getStationImage} name={hpImage} alt={t('hp', { ns: 'log' })} />;
}

function PowerWidget() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getStationImage} name="Power" alt={t('power', { ns: 'log' })} />;
}

function MoneyWidget() {
  const { t } = useTranslation();

  return <LazyLoadImage2 className="u-img-vertical-align" callback={getStationImage} name="Money" alt={t('money', { ns: 'log' })} />;
}

function RoundWidget() {
  const { t } = useTranslation();

  return <LazyLoadImage2 callback={getStationImage} name="Round" alt={t('round', { ns: 'log' })} />;
}

function RevealWidget() {
  return <LazyLoadImage2 callback={getStationImage} name="Reveal" alt="" />;
}

export {
  HpWidget,
  PowerWidget,
  MoneyWidget,
  RoundWidget,
  RevealWidget
};