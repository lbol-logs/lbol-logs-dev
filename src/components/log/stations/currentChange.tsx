import { LogContext } from 'contexts/logContext';
import { useContext, useMemo } from 'react';
import { TCardChanges, TCards, TExhibitObjs, TExhibits, TLevel } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage } from 'utils/functions/getImage';
import { useTranslation } from 'react-i18next';
import { copyObject, getCurrentLevel, getSameCardIndex, getSameExhibitIndex } from 'utils/functions/helpers';

function CurrentChange({ level, excludes }: { level: TLevel, excludes?: { Cards: TCardChanges, Exhibits: TExhibitObjs } }) {
  const { runData, act } = useContext(LogContext);
  const { t } = useTranslation();

  const { Stations, Cards, Exhibits } = runData;

  const card = useMemo(() => {
    const currentCards = getCurrentLevel(Cards, Stations, act, level);
    const excludeCards = excludes ? copyObject(excludes.Cards) : [];

    const cards = {
      Add: '＋',
      Remove: '－',
      Upgrade: '▲'
    };
    const cardIcon = <LazyLoadImage2 callback={getCommonImage} name={'Card'} alt={t('card', { ns: 'common' })} />;

    return Object.entries(cards).map(([type, symbol]) => {
      const cards = currentCards.filter(({ Type }) => Type === type);
      if (type === 'Add') {
        for (let i = 0; i < excludeCards.length; i++) {
          const index = getSameCardIndex(cards, excludeCards[i]);
          if (index !== -1) {
            cards.splice(index, 1);
            excludeCards.splice(i, 1);
          }
        }
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
    const currentExhibits = getCurrentLevel(Exhibits, Stations, act, level);
    const excludeExhibits = excludes ? copyObject(excludes.Exhibits) : [];

    const exhibits = {
      Add: '＋',
      Remove: '－',
      Use: '▼'
    };
    const exhibitIcon = <LazyLoadImage2 callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />;

    return Object.entries(exhibits).map(([type, symbol]) => {
      let exhibits: TExhibits | TExhibitObjs = currentExhibits.filter(({ Type }) => Type === type);
      if (type !== 'Use') exhibits = exhibits.map(({ Id }) => Id);
      if (type === 'Add') {
        for (let i = 0; i < excludeExhibits.length; i++) {
          const index = getSameExhibitIndex(exhibits, excludeExhibits[i]);
          if (index !== -1) {
            exhibits.splice(index, 1);
            excludeExhibits.splice(i, 1);
          }
        }
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

  return (
    <>
      {card}
      {exhibit}
    </>
  );
}

export default CurrentChange;