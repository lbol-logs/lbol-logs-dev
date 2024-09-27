import { cardSize, configsData } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardArtImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import CardName from './cardName';

function CardCard({ card, isNotAdded }: { card: TCard, isNotAdded?: boolean }) {
  const { setEntityModal } = useContext(LogContext);
  const { cardsConfigs } = configsData;
  const { IsUpgraded } = card;

  const { width, height } = cardSize;

  cardsConfigs.set(card);
  const { art, isUnremovable, type } = cardsConfigs;

  let _type = type;
  if (isUnremovable) _type += '-Unremovable';

  function onClick() {
    setEntityModal({ card });
  }

  return (
    <span className={`c-entity c-entity--${_type} ${isNotAdded === true ? 'c-entity--not-added': ''} c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`} onClick={onClick}>
      <CardName className="c-entity__text c-card__text u-text-shadow" card={card} />
      <LazyLoadImage2 className="c-card__img" callback={getCardArtImage} name={art} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;