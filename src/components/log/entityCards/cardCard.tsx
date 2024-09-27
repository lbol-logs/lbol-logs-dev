import { cardSize, configsData } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardArtImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import { getArt, isMisfortune, isUnremovable } from 'utils/functions/helpers';
import CardName from './cardName';

function CardCard({ card, isNotAdded }: { card: TCard, isNotAdded?: boolean }) {
  const { setEntityModal } = useContext(LogContext);
  const { cardsConfigs } = configsData;
  const { Id, IsUpgraded } = card;

  const { width, height } = cardSize;

  const config = cardsConfigs.get(Id);
  const { Rarity, Type, [IsUpgraded ? 1 : 0]: { Keywords } } = config;
  let type = isMisfortune(Type) ? Type : Rarity;
  if (isUnremovable(Keywords)) type += '-Unremovable';
  const art = getArt(Id, IsUpgraded, config);

  function onClick() {
    setEntityModal({ card });
  }

  return (
    <span className={`c-entity c-entity--${type} ${isNotAdded === true ? 'c-entity--not-added': ''} c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`} onClick={onClick}>
      <CardName className="c-entity__text c-card__text" card={card} />
      <LazyLoadImage2 className="c-card__img" callback={getCardArtImage} name={art} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;