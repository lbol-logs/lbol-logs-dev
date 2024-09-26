import LazyLoadImage2, { TLazyLoadImageArgs } from 'components/common/utils/lazyLoadImage2';
import { cardSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardFrameImage, getCardArtImage, getTestImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import CardName from '../entityCards/cardName';
import CMana from 'utils/classes/CMana';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function CardModal({ card }: { card: TCard }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();
card.Id = 'DoubleLianhuadie';
  const { Id, IsUpgraded } = card;
  const config = configsData.cards[Id];
  const { Colors, Owner } = config;

  // TODO
  // const { width, height } = cardArtSize;
// 1HH:HWR

  return (
    <div className="p-modal__card">
      <div style={{zIndex:999,top:0,right:0,display:'none'}}>
        <LazyLoadImage2x callback={getCardFrameImage} name="Dichromatic_Lotus_Butterfly" width="512" height="714" />
      </div>

      <div className="p-card__name c-card__center">
        <CardName className={`p-card-name__name ${IsUpgraded ? 'p-card-name__name--upgraded' : ''} js-resize`} card={card} />
      </div>
      <div className="p-card__description js-resize">
        <DescriptionWidget ns="cards" {...card} />
      </div>

      <div className="p-card__art c-card__center">
      <LazyLoadImage2x callback={getCardArtImage} name={Id} width="440" height="300" />
      </div>
      <div className="p-card__frame">
        <LazyLoadImage2x callback={getCardFrameImage} name={Colors} width="512" height="714" />
      </div>
      {Owner && (
        <div className="p-card__watermark c-card__center">
          <LazyLoadImage2x callback={getCardFrameImage} name={Owner} width="460" height="240" />
        </div>
      )}
      {/* <LazyLoadImage2 callback={getCardImage} name={Id} width={width} height={height} alt="" props={props} /> */}

      <div style={{top:0,right:0,display:'none'}}>
        <LazyLoadImage2x callback={getCardFrameImage} name="Dichromatic_Lotus_Butterfly" width="512" height="714" />
      </div>
    </div>
  );
}

export default CardModal;

function LazyLoadImage2x({ callback, name, width, height }: { callback: Function, name: string, width: string | number, height?: string | number }) {
  const props = { srcSet: null };

  // TODO
  callback = getTestImage;

  return (
    <LazyLoadImage2 callback={callback} name={`${name}@2x`} width={width} height={height} alt="" props={props} />
  );
}