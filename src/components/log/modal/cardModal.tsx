import LazyLoadImage2, { TLazyLoadImageArgs } from 'components/common/utils/lazyLoadImage2';
import { cardSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import CardName from '../entityCards/cardName';
import CMana from 'utils/classes/CMana';

function CardModal({ card }: { card: TCard }) {
  const { t } = useTranslation();

  const { Id, IsUpgraded } = card;

  // TODO
  // const { width, height } = cardArtSize;

console.log(new CMana(2).manas);
console.log(new CMana('{6C}PPP').manas);
console.log(new CMana('1HH:HWR').manas);
// 1HH:HWR

  return (
    <div className="p-modal__card">
      <div className="p-card__name">
        <CardName className={`p-card-name__name ${IsUpgraded ? 'p-card-name__name--upgraded' : ''} js-resize`} card={card} />
      </div>
      <div className="p-card__description js-resize">
        <DescriptionWidget ns="cards" {...card} />
      </div>

      {/* <LazyLoadImage2 callback={getCardImage} name={Id} width={width} height={height} alt="" props={props} /> */}
    </div>
  );
}

export default CardModal;

function LazyLoadImage2x({ callback, name, alt, width, height, className}: TLazyLoadImageArgs) {
  const props = { srcSet: null };

  return (
    <LazyLoadImage2 className={className} callback={callback} name={`${name}@2x`} width={width} height={height} alt={alt} props={props} />
  );
}