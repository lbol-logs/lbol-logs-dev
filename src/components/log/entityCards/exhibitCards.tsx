import { TExhibitChanges, TExhibitObjs, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';

function ExhibitCards({ exhibits, added = [] }: { exhibits: TExhibits | TExhibitObjs | TExhibitChanges, added?: Array<number> }) {
  return (
    <div className="c-entities c-exhibits">
      {exhibits.map((exhibit, i) => {
        const isAdded = added.includes(i);

        return (
          <ExhibitCard exhibit={exhibit} isAdded={isAdded} key={i} />
        );
      })}
    </div>
  );
}

export default ExhibitCards;