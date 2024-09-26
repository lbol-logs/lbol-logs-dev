import { cardSize } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardArtImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import { isMisfortune, isUnremovable } from 'utils/functions/helpers';
import CardName from './cardName';

function CardCard({ card, isNotAdded }: { card: TCard, isNotAdded?: boolean }) {
  const { configsData, setEntityModal } = useContext(LogContext);
  const { Id, IsUpgraded } = card;

  const { width, height } = cardSize;

  const config = configsData.cards[Id];
  const { Rarity, Type, [IsUpgraded.toString()]: { Keywords } } = config;
  let type = isMisfortune(Type) ? Type : Rarity;
  if (isUnremovable(Keywords)) type += '-Unremovable';

  function onClick() {
    setEntityModal({ card });
  }

  return (
    <span className={`c-entity c-entity--${type} ${isNotAdded === true ? 'c-entity--not-added': ''} c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`} onClick={onClick}>
      <CardName className="c-entity__text c-card__text u-text-shadow" card={card} />
      <LazyLoadImage2 className="c-card__img" callback={getCardArtImage} name={Id} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;