import { useTranslation } from 'react-i18next';

function EnemyCards({ enemies }: { enemies: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="p-enemies">
      {enemies.map((enemy, i) => {
        return (
          // TODO: enemy image
          <span className="p-enemy" key={i}>{t(enemy, { ns: 'enemies' })}</span>
        );
      })}
    </div>
  );
}

export default EnemyCards;