import { cardSize } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';

function CardCard({ card, isAdded }: { card: TCard, isAdded?: boolean }) {
  const { configsData } = useContext(LogContext);
  const { Id, IsUpgraded, UpgradeCounter } = card;
  const { t } = useTranslation();
  const { width, height } = cardSize;
  const { Rarity, IsMisfortune } = configsData.cards[Id];
  const type = IsMisfortune ? 'Misfortune' : Rarity;

  return (
    <span className={`c-entity c-entity--${type} ${isAdded ? 'c-entity--added' : ''} c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`}>
      <span className="c-entity__text c-card__text u-text-shadow">{t(Id, { ns: 'cards' })}{IsUpgraded && '+'}{UpgradeCounter}</span>
      <LazyLoadImage2 className="c-card__img" callback={getCardImage} name={Id} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;