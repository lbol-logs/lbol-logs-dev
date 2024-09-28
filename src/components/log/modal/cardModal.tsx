import LazyLoadImage2, { TLazyLoadImageArgs } from 'components/common/utils/lazyLoadImage2';
import { cardSize, configsData } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardFrameImage, getCardArtImage, getTestImage, getCardWatermarkImage, getCardTypeImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import CardName from '../entityCards/cardName';
import CMana from 'utils/classes/CMana';
import { useContext, useEffect, useRef, useState } from 'react';
import { LogContext } from 'contexts/logContext';
import { TObj } from 'utils/types/common';
import UpgradeSwitcher from './upgradeSwitcher';
import CardFrame from './cardFrame';

function CardModal({ card }: { card: TCard }) {
  const { cardsConfigs } = configsData;
  const { t } = useTranslation();

  const { Id, IsUpgraded } = card;
  const [upgraded, setUpgraded] = useState(IsUpgraded);
  const _card = Object.assign({}, card, { IsUpgraded: upgraded });
  const cardConfigs = cardsConfigs.get(_card);

  const { Type, Owner, IsUpgradable } = cardConfigs.getAll();

  const { art } = cardConfigs;

  useEffect(() => {
    const divs: Array<HTMLDivElement> = Array.from(document.querySelectorAll('.js-resize'));
    for (const div of divs) {
      const parentHeight = div.offsetHeight;
      const parentWidth = div.offsetWidth;
      while (true) {
        const child = div.firstChild as HTMLElement;
        const childHeight = child.offsetHeight;
        const childWidth = child.offsetWidth;
        if (childHeight <= parentHeight && childWidth <= parentWidth) break;
        const size = parseInt(div.style.fontSize || window.getComputedStyle(div, null).getPropertyValue('font-size'));
        if (!size) break;
        div.style.fontSize = (size - 1) + 'px';
      }
    }
  }, [upgraded]);

  return (
    <div className="p-modal__card">
      {/* <div style={{zIndex:999,top:0,right:0,display:'none'}}>
        <LazyLoadImage2x callback={getCardFrameImage} name="Dichromatic_Lotus_Butterfly" width="512" height="714" />
      </div> */}

      <div className="p-card__body c-card__resize js-resize">
        <DescriptionWidget ns="cards" {..._card} />
      </div>

      <div className="p-card__art c-card__center">
      <Image2x callback={getCardArtImage} name={art} width="440" height="304" />
      </div>
      <CardFrame cardConfigs={cardConfigs} />
      {Owner && (
        <div className="p-card__watermark c-card__center">
          <Image2x callback={getCardWatermarkImage} name={Owner} width="460" height="240" />
        </div>
      )}
      <div className="p-card__type-icon">
        <Image2x callback={getCardTypeImage} name={Type} width="72" height="72" />
      </div>
      <div className="p-card__type-text c-card__resize js-resize">
        <span className="c-card-type__text u-text-shadow">{t(`cardTypes.${Type}`, { ns: 'log' })}</span>
      </div>
      <div className={`p-card__name c-card__center ${upgraded ? 'c-card--upgraded' : ''} c-card__resize js-resize`}>
        <CardName className="p-card-name__text c-card__text u-text-shadow" card={_card} />
      </div>

      {/* <div style={{top:0,right:0,display:'none'}}>
        <LazyLoadImage2x callback={getCardFrameImage} name="Dichromatic_Lotus_Butterfly" width="512" height="714" />
      </div> */}
      {IsUpgradable && <UpgradeSwitcher upgraded={upgraded} setUpgraded={setUpgraded} />}
    </div>
  );
}

export default CardModal;

function Image2x({ callback, name, width, height, className }: { callback: Function, name: string, width: string | number, height?: string | number, className?: string }) {

  // TODO
  // callback = getTestImage;

  return (
    <img className={className} src={callback(`${name}@2x`)} width={width} height={height} alt="" />
  );
}

export {
  Image2x
};