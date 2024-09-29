import { configsData } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCardArtImage, getCardWatermarkImage, getCardTypeImage, getUnityImage } from 'utils/functions/getImage';
import { TCard } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import CardName from '../entityCards/cardName';
import { useEffect, useState } from 'react';
import { TComponents } from 'utils/types/common';
import UpgradeSwitcher from './upgradeSwitcher';
import CardFrame from './cardFrame';
import CardManasWidget from './cardManasWidget';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';

function CardModal({ card }: { card: TCard }) {
  const { cardsConfigs } = configsData;
  const { t, i18n } = useTranslation();

  const { IsUpgraded } = card;
  const [upgraded, setUpgraded] = useState(IsUpgraded);
  const _card = Object.assign({}, card, { IsUpgraded: upgraded });

  const cardConfigs = cardsConfigs.get(_card);
  const allCardConfigs = cardConfigs.getAll();
  const { Type, Cost, Owner, IsUpgradable, OverrideUltimateCost } = allCardConfigs;
  const { art } = cardConfigs;

  const isTeammate = Type === 'Friend';
  const ns = 'cards';

  const descriptions: TComponents = [];
  let exist = true;
  if (isTeammate) {
    const { Id } = card;
    const keys = [`${Id}.Description`];
    if (IsUpgraded) keys.unshift(`${Id}.UpgradedDescription`);
      // TODO
    if (!i18n.exists(keys, { ns })) exist = false;
  }
  if (exist) {
    const description = (
      <div className="p-card__description" key="Description">
        <DescriptionWidget ns={ns} {..._card} />
      </div>
    );
    descriptions.push(description);
  }

  let unity = null;

  if (isTeammate) {
    const { Loyalty } = allCardConfigs;

    unity = (
      <div className="p-card__unity">
        <LazyLoadImage2x callback={getUnityImage} name="Unity" width="92" height="92" />
        <span className="c-card-unity__text p-card__text u-text-shadow">{Loyalty}</span>
      </div>
    );

    const keys = { 
      Passive: 'Passive',
      Active: 'Active',
      Ultimate: OverrideUltimateCost ? 'Active' : 'Ultimate'
    };
    for (const [key, type] of Object.entries(keys)) {
      let cost = allCardConfigs[`${key}Cost`];
      if (cost === undefined) continue;

      const description = (
        <div className="p-card__description p-card__description--teammate" key={key}>
          <LazyLoadImage2x className="c-teammate-cost" callback={getUnityImage} name={`${type}/${cost}`} width="76" height="38" />
          <DescriptionWidget ns={ns} {..._card} key={key} />
        </div>
      );
      descriptions.push(description);
    }
  }

  const oneLine = 'p-card__body--one-line';

  useEffect(() => {
    const divs: Array<HTMLDivElement> = Array.from(document.querySelectorAll('.js-resize'));
    for (const div of divs) {
      div.style.fontSize = '';

      let child;
      if (div.classList.contains('p-card__body')) {
        child = div.firstChild as HTMLDivElement;
        const children = child.children as HTMLCollectionOf<HTMLDivElement>;
        if (children.length === 1) {
          const height = child.offsetHeight;;
          const description = children[0];
          const lineHeight = parseInt(getComputedStyle(description).lineHeight);
          if (height === lineHeight) {
            div.classList.add(oneLine);
            continue;
          }
          else {
            div.classList.remove(oneLine);
          }
        }
      }

      const parentHeight = div.offsetHeight;
      const parentWidth = div.offsetWidth;
      let fontSize = parseInt(getComputedStyle(div).fontSize);
      if (!fontSize) continue;
      if (!child) child = div.firstChild as HTMLElement;
      while (true) {
        const childHeight = child.offsetHeight;
        const childWidth = child.offsetWidth;
        if (childHeight <= parentHeight && childWidth <= parentWidth) break;
        fontSize--;
        if (!fontSize) break;
        div.style.fontSize = (fontSize - 1) + 'px';
      }
    }
  }, [upgraded]);

  return (
    <div className="p-modal__card">
      <div className="p-card__art c-card__center">
      <LazyLoadImage2x callback={getCardArtImage} name={art} width="440" height="304" />
      </div>
      <CardFrame cardConfigs={cardConfigs} />
      {Owner && (
        <div className="p-card__watermark c-card__center">
          <LazyLoadImage2x callback={getCardWatermarkImage} name={Owner} width="460" height="240" />
        </div>
      )}
      <div className="p-card__type-icon">
        <LazyLoadImage2x callback={getCardTypeImage} name={Type} width="72" height="72" />
      </div>
      <div className="p-card__type-text c-card__resize js-resize">
        <span className="c-card-type__text p-card__text u-text-shadow">{t(`cardTypes.${Type}`, { ns: 'log' })}</span>
      </div>
      <div className="p-card__cost">
        <CardManasWidget cardMana={Cost} is2x={true} />
      </div>
      <div className={`p-card__name c-card__center ${upgraded ? 'c-card--upgraded' : ''} c-card__resize js-resize`}>
        <CardName className="p-card-name__text c-card__text p-card__text u-text-shadow" card={_card} />
      </div>
      {unity}
      <div className="p-card__body c-card__center c-card__resize js-resize">
        <div className="p-card__descriptions">
          {descriptions}
        </div>
      </div>
      {IsUpgradable && <UpgradeSwitcher upgraded={upgraded} setUpgraded={setUpgraded} />}
    </div>
  );
}

export default CardModal;

function LazyLoadImage2x({ callback, name, width, height, className }: { callback: Function, name: string, width: string | number, height?: string | number, className?: string }) {
  const props = { srcSet: null };

  return (
    <LazyLoadImage2 className={className} callback={callback} name={`${name}@2x`} width={width} height={height} alt="" props={props} />
  );
}

export {
  LazyLoadImage2x
};