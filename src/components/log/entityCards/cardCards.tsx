import { TCardChanges, TCards } from 'utils/types/runData';
import CardCard from './cardCard';

function CardCards({ cards, added = [] }: { cards: TCards, added?: Array<number> }) {
  let addedCards = added ? [...added] : [];

  return (
    <div className="c-entities c-cards">
      {cards.map((card, i) => {
        const isAdded = added.includes(i);

        return (
          <CardCard card={card} isAdded={isAdded} key={i} />
        );
      })}
    </div>
  );
}

export default CardCards;