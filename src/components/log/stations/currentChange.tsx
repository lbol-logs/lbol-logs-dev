import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TExhibitObjs, TExhibits, TLevel } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';

function CurrentChange({ level }: { level: TLevel }) {
  const { runData, act } = useContext(LogContext);
  const { t } = useTranslation();

  const { Stations, Cards, Exhibits } = runData;

  const isCurrentLevel = (({ Station }: { Station: number }) => {
    const station = Stations[Station];
    const { Act, Level } = station.Node;
    const _isCurrentLevel = Act === act && Level === level;
    return _isCurrentLevel;
  });

  let card;
  {
    const currentCards = Cards.filter(isCurrentLevel);
    const cards = {
      Add: '＋',
      Remove: '－',
      Upgrade: '▲'
    };
    const cardIcon = <LazyLoadImage src={getCommonImage('Card')} width={iconSize} height={iconSize} alt={t('card', { ns: 'common' })} />;
    card = Object.entries(cards).map(([type, symbol]) => {
      const cards = currentCards.filter(({ Type }) => Type === type);
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
  }

  let exhibit;
  {
    const currentExhibits = Exhibits.filter(isCurrentLevel);
    const exhibits = {
      Add: '＋',
      Remove: '－',
      Use: '▼'
    };
    const exhibitIcon = <LazyLoadImage src={getCommonImage('Exhibit')} width={iconSize} height={iconSize} alt={t('exhibit', { ns: 'common' })} />;
    exhibit = Object.entries(exhibits).map(([type, symbol]) => {
      let exhibits: TExhibits | TExhibitObjs = currentExhibits.filter(({ Type }) => Type === type);
      if (type !== 'Use') exhibits = exhibits.map(({ Id }) => Id);
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
  }

  return (
    <>
      {card}
      {exhibit}
    </>
  );
}

export default CurrentChange;