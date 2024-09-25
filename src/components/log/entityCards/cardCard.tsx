import { cardSize } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCardImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import { isMisfortune, isUnremovable } from 'utils/functions/helpers';

function CardCard({ card, isNotAdded }: { card: TCard, isNotAdded?: boolean }) {
  const { configsData, setEntityModal } = useContext(LogContext);
  const { Id, IsUpgraded, UpgradeCounter } = card;
  const { t } = useTranslation();
  const { width, height } = cardSize;

  const config = configsData.cards[Id];
  const { Rarity, Type, [IsUpgraded.toString()]: { Keywords } } = config;
  let type = isMisfortune(Type) ? Type : Rarity;
  if (isUnremovable(Keywords)) type += '-Unremovable';
  const upgradeCounter = UpgradeCounter ? UpgradeCounter : '';

  function onClick() {
    setEntityModal({ card });
  }

  return (
    <span className={`c-entity c-entity--${type} ${isNotAdded === true ? 'c-entity--not-added': ''} c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`} onClick={onClick}>
      <span className="c-entity__text c-card__text u-text-shadow">{t(Id, { ns: 'cards' })}{IsUpgraded && '+'}{upgradeCounter}</span>
      <LazyLoadImage2 className="c-card__img" callback={getCardImage} name={Id} width={width} height={height} alt="" />
    </span>
  );
}

export default CardCard;