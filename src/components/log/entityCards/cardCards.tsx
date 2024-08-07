import { TCards } from 'utils/types/runData';
import CardCard from './cardCard';

function CardCards({ cards }: { cards: TCards }) {
  return (
    <div className="c-entities c-cards">
      {cards.map((card, i) => {
        return (
          <CardCard card={card} key={i} />
        );
      })}
    </div>
  );
}

export default CardCards;