import { useTranslation } from 'react-i18next';

function EnemyCard({ enemy }: { enemy: string }) {
  const { t } = useTranslation();

  return (
    <span className="p-enemy">{t(enemy, { ns: 'enemies' })}</span>
  );
}

export default EnemyCard;