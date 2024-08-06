import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TLevel } from 'utils/types/runData';
import CardsR from '../cardsR/cardsR';
import ExhibitsR from '../exhibitsR/exhibitsR';

function CurrentChange({ level }: { level: TLevel }) {
  const { runData, act } = useContext(LogContext);

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

  return (
    <>
      {hasCurrentCardsAdded && (
      <div className="c-entity">
        <div className="c-entity__label">currentCardsAdded</div>
        <CardsR cards={currentCardsAdded} />
      </div>
      )}

      {hasCurrentCardsRemoved && (
      <div className="c-entity">
        <div className="c-entity__label">currentCardsRemoved</div>
        <CardsR cards={currentCardsRemoved} />
      </div>
      )}

      {hasCurrentCardsUpgraded && (
      <div className="c-entity">
        <div className="c-entity__label">currentCardsUpgraded</div>
        <CardsR cards={currentCardsUpgraded} />
      </div>
      )}

      {hasCurrentExhibitsAdded && (
      <div className="c-entity">
        <div className="c-entity__label">currentExhibitsAdded</div>
        <ExhibitsR exhibits={currentExhibitsAdded} />
      </div>
      )}

      {hasCurrentExhibitsRemoved && (
      <div className="c-entity">
        <div className="c-entity__label">currentExhibitsRemoved</div>
        <ExhibitsR exhibits={currentExhibitsRemoved} />
      </div>
      )}
    </>
  );
}

export default CurrentChange;