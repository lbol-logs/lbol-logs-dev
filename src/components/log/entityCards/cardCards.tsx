import { TCard, TCards, TCardsWithPrice, TCardWithPrice } from 'utils/types/runData';
import CardCard from './cardCard';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getStationImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';

function CardCards({ cards, added }: { cards: TCards | TCardsWithPrice, added?: Array<number> }) {
  return (
    <div className="c-entities c-cards">
      {cards.map((card, i) => {
        const isNotAdded = Boolean(added && !added.includes(i));
        const { Price, IsDiscounted } = card as TCardWithPrice;

        if (Price === undefined) {
          return (
            <CardCard card={card as TCard} isNotAdded={isNotAdded} key={i} />
          );
        }
        else {
          return (
            <div className="c-entity--with-price" key={i}>
              <CardCard card={card as TCard} isNotAdded={isNotAdded} />
              <span className="c-price">
                {Price}
                {IsDiscounted && <LazyLoadImage2 callback={getStationImage} name="Discount" width={iconSize} height={iconSize / 2} alt="" />}
              </span>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CardCards;