import LazyLoadImage2, { TLazyLoadImageArgs } from 'components/common/utils/lazyLoadImage2';
import { cardSize, configsData } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardArtImage, getCardWatermarkImage, getCardTypeImage, getCardImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import CardName from '../entityCards/cardName';
import CMana from 'utils/classes/CMana';
import { useContext, useEffect, useRef, useState } from 'react';
import { LogContext } from 'contexts/logContext';
import { TObj } from 'utils/types/common';
import UpgradeSwitcher from './upgradeSwitcher';
import CardFrame from './cardFrame';
import CardManasWidget from './cardManasWidget';

function CardModal({ card }: { card: TCard }) {
  const { cardsConfigs } = configsData;
  const { t } = useTranslation();

  const { IsUpgraded } = card;
  const [upgraded, setUpgraded] = useState(IsUpgraded);
  const _card = Object.assign({}, card, { IsUpgraded: upgraded });
// Object.assign(_card, { Id: 'ModuoluoSeasons' })
  const cardConfigs = cardsConfigs.get(_card);

  const { Type, Owner, IsUpgradable, Loyalty } = cardConfigs.getAll();

  const { art, cost } = cardConfigs;

  const isTeammate = Type === 'Friend';

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
        <span className="c-card-type__text p-card__text u-text-shadow">{t(`cardTypes.${Type}`, { ns: 'log' })}</span>
      </div>
      <div className="p-card__cost">
        <CardManasWidget cardMana={cost} is2x={true} />
      </div>
      <div className={`p-card__name c-card__center ${upgraded ? 'c-card--upgraded' : ''} c-card__resize js-resize`}>
        <CardName className="p-card-name__text c-card__text u-text-shadow" card={_card} />
      </div>
      {isTeammate && (
        <div className="p-card__unity">
          <Image2x callback={getCardImage} name="Unity" width="92" height="92" />
          {/* <img src="/Unity.png" width="92" height="92" /> */}
          <span className="c-card-unity__text p-card__text u-text-shadow">{Loyalty}</span>
        </div>
      )}

      <div style={{top:0,right:0,width:536,display:'none'}}>
        <img src="/2.png" width="536" height="714" />
      </div>

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