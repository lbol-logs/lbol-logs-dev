import { TCard } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';

function CardName({ className, card }: { className: string, card: TCard }) {
  const { t } = useTranslation();

  const { Id, IsUpgraded, UpgradeCounter } = card;
  const upgradeCounter = IsUpgraded ? (UpgradeCounter || '') : '';

  return (
    <span className={className}>
      {t(`${Id}.Name`, { ns: 'cards' })}
      {IsUpgraded && '+'}
      {upgradeCounter}
    </span>
  );
}

export default CardName;