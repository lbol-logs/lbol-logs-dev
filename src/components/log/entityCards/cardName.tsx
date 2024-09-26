import { TCard } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';

function CardName({ className, card }: { className: string, card: TCard }) {
  const { t } = useTranslation();

  const { Id, IsUpgraded, UpgradeCounter } = card;
  const upgradeCounter = UpgradeCounter || '';

  return (
    <span className={className}>
      {/* TODO */}
      {/* {t(Id, { ns: 'cards' })} */}
      {t(Id, { ns: 'cards' })}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      {IsUpgraded && '+'}
      {upgradeCounter}
    </span>
  );
}

export default CardName;