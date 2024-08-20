import { TExhibitChanges, TExhibitObjs, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';

function ExhibitCards({ exhibits, added }: { exhibits: TExhibits | TExhibitObjs | TExhibitChanges, added?: Array<number> }) {
  return (
    <div className="c-entities c-exhibits">
      {exhibits.map((exhibit, i) => {
        const isNotAdded = Boolean(added && !added.includes(i));

        return (
          <ExhibitCard exhibit={exhibit} isNotAdded={isNotAdded} key={i} />
        );
      })}
    </div>
  );
}

export default ExhibitCards;