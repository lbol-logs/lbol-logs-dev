import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStationImage } from 'utils/functions/getImage';

function HpImage({ hpImage }: { hpImage: string }) {
  const { t } = useTranslation();

  return <LazyLoadImage2 callback={getStationImage} name={hpImage} alt={t('hp', { ns: 'log' })} />;
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
  return <LazyLoadImage2 callback={getStationImage} name="Reveal" alt="" />;
}

export {
  HpImage,
  PowerImage,
  MoneyImage,
  RoundImage,
  RevealImage
};