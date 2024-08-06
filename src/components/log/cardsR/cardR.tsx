import { TCard } from 'utils/types/runData';

function CardR({ card }: { card: TCard }) {
  const { Id, IsUpgraded, UpgradeCounter } = card;

  return (
    <span className={`c-card ${IsUpgraded ? 'c-card--upgraded' : ''}`}>
      {Id}{IsUpgraded && '+'}{UpgradeCounter}
    </span>
  );
}

export default CardR;