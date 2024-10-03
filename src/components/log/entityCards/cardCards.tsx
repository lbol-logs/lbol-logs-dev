import { TCard, TCards, TCardsWithPrice, TCardWithPrice } from 'utils/types/runData';
import CardCard from './cardCard';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getStationImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import { Fragment } from 'react/jsx-runtime';

function CardCards({ cards, added }: { cards: TCards | TCardsWithPrice, added?: Array<number> }) {
  return (
    <div className="c-entities c-cards">
      {cards.map((card, i) => {
        const isNotAdded = Boolean(added && !added.includes(i));
        let price;
        const { Price, IsDiscounted } = card as TCardWithPrice;
        if (Price !== undefined) {
          price = (
            <span className="c-price">
              {Price}
              {IsDiscounted && <LazyLoadImage2 callback={getStationImage} name="Discount" width={iconSize} height={iconSize / 2} alt="" />}
            </span>
          );
        }

        return (
          <Fragment key={i}>
            <CardCard card={card as TCard} isNotAdded={isNotAdded} />
            {price}
          </Fragment>
        );
      })}
    </div>
  );
}

export default CardCards;