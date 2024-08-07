import { TCard } from 'utils/types/runData';

function CardCard({ card }: { card: TCard }) {
  const { Id, IsUpgraded, UpgradeCounter } = card;

  return (
    <span className={`c-entity c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`}>
      {Id}{IsUpgraded && '+'}{UpgradeCounter}
    </span>
  );
}

export default CardCard;