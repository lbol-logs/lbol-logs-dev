import { TCards } from 'utils/types/runData';
import CardR from './cardR';

function CardsR({ cards }: { cards: TCards }) {
  return (
    <div className="c-cards">
      {cards.map((card, i) => {
        return (
          <CardR card={card} key={i} />
        );
      })}
    </div>
  );
}

export default CardsR;