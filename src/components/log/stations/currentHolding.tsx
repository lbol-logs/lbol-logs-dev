import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TCards, TExhibit, TExhibitObjs, THolding, TLevel } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';

function CurrentHolding({ level }: { level: TLevel }) {
  const { act, holdings } = useContext(LogContext);

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  let Cards: TCards = [];
  let Exhibits: TExhibitObjs = [];
  if (currentHolding) {
    ( { Cards, Exhibits } = currentHolding );
  }
  // console.log({holdings});
  console.log({Cards});
  // console.log({Exhibits});

  return (
    <>
      currentHoldings
      <CardCards cards={Cards} />
      <ExhibitCards exhibits={Exhibits} />
    </>
  );
}

export default CurrentHolding;