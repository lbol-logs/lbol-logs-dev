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
import { getArt } from 'utils/functions/helpers';
import UpgradeSwitcher from './upgradeSwitcher';

function CardModal({ card }: { card: TCard }) {
  const { cardsConfigs } = configsData;
  const { t } = useTranslation();

  const { Id, IsUpgraded } = card;
  const config = cardsConfigs.get(Id);

  const { Type, Rarity, Colors, Owner } = config;

  const [upgraded, setUpgraded] = useState(IsUpgraded);
  Object.assign(card, { IsUpgraded: upgraded });

  let color;
  if (['Tool', 'Misfortune'].includes(Type)) color = Type;
  else if (Colors === undefined) color = 'C';
  else if (Colors.length >= 3) color = 'Rainbow';
  else color = Colors;
  const frame = `${Rarity}/${color}`;
  const art = getArt(card, config);

  useEffect(() => {
    const divs: Array<HTMLDivElement> = Array.from(document.querySelectorAll('.js-resize'));
    for (const div of divs) {
      const parent = div.offsetHeight;
      while (true) {
        const child = (div.firstChild as HTMLElement).offsetHeight;
        if (child <= parent) break;
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
        <DescriptionWidget ns="cards" {...card} />
      </div>

      <div className="p-card__art c-card__center">
      <Image2x callback={getCardArtImage} name={art} width="440" height="304" />
      </div>
      <div className="p-card__frame">
        <Image2x callback={getCardFrameImage} name={frame} width="512" height="714" />
      </div>
      {Owner && (
        <div className="p-card__watermark c-card__center">
          <Image2x callback={getCardWatermarkImage} name={Owner} width="460" height="240" />
        </div>
      )}
      <div className="p-card__type">
        <Image2x callback={getCardTypeImage} name={Type} width="72" height="72" />
      </div>
      <div className={`p-card__name c-card__center ${upgraded ? 'c-card--upgraded' : ''} c-card__resize js-resize`}>
        <CardName className="c-card__text p-card-name__name" card={card} />
      </div>

      {/* <div style={{top:0,right:0,display:'none'}}>
        <LazyLoadImage2x callback={getCardFrameImage} name="Dichromatic_Lotus_Butterfly" width="512" height="714" />
      </div> */}
      {config.IsUpgradable && <UpgradeSwitcher upgraded={upgraded} setUpgraded={setUpgraded} />}
    </div>
  );
}

export default CardModal;

function Image2x({ callback, name, width, height }: { callback: Function, name: string, width: string | number, height?: string | number }) {

  // TODO
  // callback = getTestImage;

  return (
    <img src={callback(`${name}@2x`)} width={width} height={height} alt="" />
  );
}