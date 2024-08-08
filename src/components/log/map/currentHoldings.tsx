import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { TCards, TExhibitObjs, THolding } from 'utils/types/runData';
import CardCards from '../entityCards/cardCards';
import ExhibitCards from '../entityCards/exhibitCards';
import Processing from 'components/common/processing';

function CurrentHoldings() {
  const { act, level, holdings } = useContext(LogContext);

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  let Cards: TCards = [];
  let Exhibits: TExhibitObjs = [];
  let holding;
  if (currentHolding) {
    ( { Cards, Exhibits } = currentHolding );
    holding = (
      <>
        currentHoldings
        <CardCards cards={Cards} />
        <ExhibitCards exhibits={Exhibits} />
      </>
    );
  }
  else {
    holding = <Processing />
  }
  // console.log({holdings});
  // console.log({Cards});
  // console.log({Exhibits});

  return (
    <div className="p-map__holdings">
      {holding}
    </div>
  );
}

export default CurrentHoldings;