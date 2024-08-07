import { TCards } from 'utils/types/runData';
import CardCarad from './cardCard';

function CardCards({ cards }: { cards: TCards }) {
  return (
    <div className="c-cards">
      {cards.map((card, i) => {
        return (
          <CardCarad card={card} key={i} />
        );
      })}
    </div>
  );
}

export default CardCards;