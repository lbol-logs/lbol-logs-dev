import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TLevel } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/getImage';
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

  const currentCards = Cards.filter(isCurrentLevel);
  
  const currentCardsAdded = currentCards.filter(({ Type }) => Type === 'Add');
  const hasCurrentCardsAdded = currentCardsAdded.length > 0;

  const currentCardsRemoved = currentCards.filter(({ Type }) => Type === 'Remove');
  const hasCurrentCardsRemoved = currentCardsRemoved.length > 0;

  const currentCardsUpgraded = currentCards.filter(({ Type }) => Type === 'Upgrade');
  const hasCurrentCardsUpgraded = currentCardsUpgraded.length > 0;

  const currentExhibits = Exhibits.filter(isCurrentLevel);

  const currentExhibitsAdded = currentExhibits.filter(({ Type }) => Type === 'Add').map(e => e.Id);
  const hasCurrentExhibitsAdded = currentExhibitsAdded.length > 0;

  const currentExhibitsRemoved = currentExhibits.filter(({ Type }) => Type === 'Remove').map(e => e.Id);
  const hasCurrentExhibitsRemoved = currentExhibitsRemoved.length > 0;

  const currentExhibitsUsed = currentExhibits.filter(({ Type }) => Type === 'Use');
  const hasCurrentExhibitsUsed = currentExhibitsUsed.length > 0;

  const card = t('card', { ns: 'common' });
  const cardsAdd = hasCurrentCardsAdded && (
    <div className="p-entity">
      <h3 className="p-entity__label">
        <LazyLoadImage src={getCommonImage('Card')} width={iconSize} height={iconSize} alt={card} />
        <span className="p-entity__add">+</span>
      </h3>
      <CardCards cards={currentCardsAdded} />
    </div>
  );

  const cardsRemove = hasCurrentCardsRemoved && (
    <div className="p-entity">
      <h3 className="p-entity__label">currentCardsRemoved</h3>
      <CardCards cards={currentCardsRemoved} />
    </div>
  );

  const cardsUpgrade = hasCurrentCardsUpgraded && (
    <div className="p-entity">
      <h3 className="p-entity__label">currentCardsUpgraded</h3>
      <CardCards cards={currentCardsUpgraded} />
    </div>
  );

  const cards = (
    <>
      {cardsAdd}
      {cardsRemove}
      {cardsUpgrade}
    </>
  );

  let exhibits = null;

  return (
    <>
      {cards}
      {hasCurrentExhibitsAdded && (
      <div className="p-entity">
        <h3 className="p-entity__label">currentExhibitsAdded</h3>
        <ExhibitCards exhibits={currentExhibitsAdded} />
      </div>
      )}

      {hasCurrentExhibitsRemoved && (
      <div className="p-entity">
        <h3 className="p-entity__label">currentExhibitsRemoved</h3>
        <ExhibitCards exhibits={currentExhibitsRemoved} />
      </div>
      )}

      {hasCurrentExhibitsUsed && (
      <div className="p-entity">
        <h3 className="p-entity__label">currentExhibitsUsed</h3>
        <ExhibitCards exhibits={currentExhibitsUsed} />
      </div>
      )}
    </>
  );
}

export default CurrentChange;