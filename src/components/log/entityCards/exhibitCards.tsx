import { TExhibitObjs, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';
import { TRange3 } from 'utils/types/common';

function ExhibitCards({ exhibits, counters = [] }: { exhibits: TExhibits | TExhibitObjs, counters?: Array<TRange3> }) {
  const isExhibitObj = counters.length > 0;
  const _exhibits = isExhibitObj ? (exhibits as TExhibitObjs).map(({ Id }) => Id) : (exhibits as TExhibits);

  return (
    <div className="c-exhibits">
      {_exhibits.map((exhibit, i) => {
        return (
          <ExhibitCard exhibit={exhibit} key={i} />
        );
      })}
    </div>
  );
}

export default ExhibitCards;