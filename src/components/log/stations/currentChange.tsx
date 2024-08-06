import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TLevel } from 'utils/types/runData';
import CardsR from '../cardsR/cardsR';
import ExhibitsR from '../exhibitsR/exhibitsR';

function CurrentChange({ level }: { level: TLevel }) {
  const { runData, act } = useContext(LogContext);

  const { Cards, Exhibits } = runData;

  const currentCards = Cards.filter(({ Node: { Act, Level } }) => Act === act && Level === level);
  
  const currentCardsAdded = currentCards.filter(({ Type }) => Type === 'Add');
  const hasCurrentCardsAdded = currentCardsAdded.length;

  const currentCardsRemoved = currentCards.filter(({ Type }) => Type === 'Remove');
  const hasCurrentCardsRemoved = currentCardsRemoved.length;

  const currentCardsUpgraded = currentCards.filter(({ Type }) => Type === 'Upgrade');
  const hasCurrentCardsUpgraded = currentCardsUpgraded.length;

  const currentExhibits = Exhibits.filter(({ Node: { Act, Level } }) => Act === act && Level === level);

  const currentExhibitsAdded = currentExhibits.filter(({ Type }) => Type === 'Add').map(e => e.Id);
  const hasCurrentExhibitsAdded = currentExhibitsAdded.length;

  const currentExhibitsRemoved = currentExhibits.filter(({ Type }) => Type === 'Remove').map(e => e.Id);
  const hasCurrentExhibitsRemoved = currentExhibitsRemoved.length;

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