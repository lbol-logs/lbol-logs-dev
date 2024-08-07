import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { THolding, TLevel } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';

function CurrentHolding({ level }: { level: TLevel }) {
  const { act, holdings } = useContext(LogContext);

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  let historyCards, historyExhibits;
  if (currentHolding) {
    ( { Cards: historyCards, Exhibits: historyExhibits } = currentHolding );
  }

  return (
    <>
      currentHoldings
    </>
  );
}

export default CurrentHolding;