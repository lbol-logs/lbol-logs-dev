import { TCards } from 'utils/types/runData';
import CardCard from './cardCard';

function CardCards({ cards, added }: { cards: TCards, added?: Array<number> }) {
  return (
    <div className="c-entities c-cards">
      {cards.map((card, i) => {
        const isNotAdded = Boolean(added && !added.includes(i))

        return (
          <CardCard card={card} isNotAdded={isNotAdded} key={i} />
        );
      })}
    </div>
  );
}

export default CardCards;