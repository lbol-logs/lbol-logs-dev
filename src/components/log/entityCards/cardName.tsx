import { TCard } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import { getEntityNs } from 'utils/functions/helpers';

function CardName({ className, card }: { className: string, card: TCard }) {
  const { t } = useTranslation();

  const { Id, IsUpgraded, UpgradeCounter } = card;
  const upgradeCounter = IsUpgraded ? (UpgradeCounter || '') : '';
  const [ns] = getEntityNs({ card });

  return (
    <span className={className}>
      {t(`${Id}.Name`, { ns })}
      {IsUpgraded && '+'}
      {upgradeCounter}
    </span>
  );
}

export default CardName;