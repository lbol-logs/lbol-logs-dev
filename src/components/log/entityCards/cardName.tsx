import { TCard } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';

function CardName({ card }: { card: TCard }) {
  const { t } = useTranslation();

  const { Id, IsUpgraded, UpgradeCounter } = card;
  const upgradeCounter = UpgradeCounter || '';

  return (
    <span className="c-entity__text c-card__text u-text-shadow">
      {t(Id, { ns: 'cards' })}
      {IsUpgraded && '+'}
      {upgradeCounter}
    </span>
  );
}

export default CardName;