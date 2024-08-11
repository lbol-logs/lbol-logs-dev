import EnemyCard from './enemyCard';

function EnemyCards({ enemies }: { enemies: Array<string> }) {
  return (
    <div className="p-enemies">
      {enemies.map((enemy, i) => {
        return <EnemyCard key={i} enemy={enemy} />;
      })}
    </div>
  );
}

export default EnemyCards;