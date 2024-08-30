import { LogContext } from 'contexts/logContext';
import { useContext, useMemo } from 'react';
import { TCardChanges, TExhibitObjs, TExhibits, TStation } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage } from 'utils/functions/getImage';
import { useTranslation } from 'react-i18next';
import { copyObject, getCurrentLevel, getSameCardIndex, getSameExhibitIndex } from 'utils/functions/helpers';
import ManaWidget from 'components/common/parts/manaWidget';
import { TObjString } from 'utils/types/common';
import BaseManaWidget from 'components/common/parts/baseManaWidget';

function CurrentChange({ station, excludes }: { station: TStation, excludes?: { Cards: TCardChanges, Exhibits: TExhibitObjs } }) {
  const { runData, configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Stations, Cards, Exhibits } = runData;
  const eventConfigs = configsData.events;

  const card = useMemo(() => {
    const currentCards = getCurrentLevel(Cards, Stations, station);
    let excludeCards = excludes ? copyObject(excludes.Cards) : [];

    const cards = {
      Add: '＋',
      Remove: '－',
      Upgrade: '▲'
    };
    const cardIcon = <LazyLoadImage2 callback={getCommonImage} name="Card" alt={t('card', { ns: 'common' })} />;

    return Object.entries(cards).map(([type, symbol]) => {
      const cards = currentCards.filter(({ Type }) => Type === type);
      if (type === 'Add') {
        const currentExcludes = copyObject(excludeCards);
        for (let i = 0; i < excludeCards.length; i++) {
          const index = getSameCardIndex(cards, excludeCards[i]);
          if (index !== -1) {
            cards.splice(index, 1);
            currentExcludes.splice(i, 1);
          }
        }
        excludeCards = currentExcludes;
      }
      
      const hasCards = cards.length > 0;
      if (hasCards) {
        return (
          <div className="p-entity p-entity--cards" key={type}>
            <div className="p-entity__label">
              {cardIcon}
              <span className={`p-entity__symbol p-entity__symbol--${type}`}>{symbol}</span>
            </div>
            <CardCards cards={cards} />
          </div>
        );
      }
      else {
        return null;
      }
    });
  }, []);

  const exhibit = useMemo(() => {
    const currentExhibits = getCurrentLevel(Exhibits, Stations, station);
    let excludeExhibits = excludes ? copyObject(excludes.Exhibits) : [];

    const exhibits = {
      Add: '＋',
      Remove: '－',
      Upgrade: '▲',
      Use: '▼'
    };
    const exhibitIcon = <LazyLoadImage2 callback={getCommonImage} name="Exhibit" alt={t('exhibit', { ns: 'common' })} />;

    return Object.entries(exhibits).map(([type, symbol]) => {
      let exhibits: TExhibits | TExhibitObjs = currentExhibits.filter(({ Type }) => Type === type);
      if (type !== 'Use') exhibits = exhibits.map(({ Id }) => Id);
      if (type === 'Add') {
        const currentExcludes = copyObject(excludeExhibits);
        for (let i = 0; i < excludeExhibits.length; i++) {
          const index = getSameExhibitIndex(exhibits, excludeExhibits[i]);
          if (index !== -1) {
            exhibits.splice(index, 1);
            currentExcludes.splice(i, 1);
          }
        }
        excludeExhibits = currentExcludes;
      }

      const hasExhibits = exhibits.length > 0;
      if (hasExhibits) {
        return (
          <div className="p-entity p-entity--exhibits" key={type}>
            <div className="p-entity__label">
              {exhibitIcon}
              <span className={`p-entity__symbol p-entity__symbol--${type}`}>{symbol}</span>
            </div>
            <ExhibitCards exhibits={exhibits} />
          </div>
        );
      }
      else {
        return null;
      }
    });
  }, []);

  const baseMana = useMemo(() => {
    const { Id, Data } = station;
    if (!Data) return null;

    const { mana } = eventConfigs[Id as string];
    const { Color } = Data;
    if (!mana || !Color) return null;

    const manas = {
      Remove: '－',
      Add: '＋'
    };
    const colorIcon = <ManaWidget mana="A" />;

    const colors: TObjString = {
      Remove: Color,
      Add: mana
    };

    return Object.entries(manas).map(([type, symbol]) => {
      return (
        <div className="p-entity p-entity--colors" key={type}>
          <div className="p-entity__label">
            {colorIcon}
            <span className={`p-entity__symbol p-entity__symbol--${type}`}>{symbol}</span>
          </div>
          <BaseManaWidget baseMana={colors[type]} />
        </div>
      );
    });
  }, []);

  return (
    <>
      {card}
      {exhibit}
      {baseMana}
    </>
  );
}

export default CurrentChange;