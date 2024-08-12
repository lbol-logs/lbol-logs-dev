import { cardSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCardImage } from 'utils/getImage';
import { TCard } from 'utils/types/runData';

function CardCard({ card }: { card: TCard }) {
  const { Id, IsUpgraded, UpgradeCounter } = card;
  const { t } = useTranslation();
  const { width, height } = cardSize;

  return (
    <span className={`c-entity c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`}>
      <span className="c-entity__text c-card__text">{t(Id, { ns: 'cards' })}{IsUpgraded && '+'}{UpgradeCounter}</span>
      <LazyLoadImage className="c-card__img" src={getCardImage(Id)} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;