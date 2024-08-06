import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { THolding, TLevel } from 'utils/types/runData';
import CardsR from '../cardsR/cardsR';
import ExhibitsR from '../exhibitsR/exhibitsR';

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