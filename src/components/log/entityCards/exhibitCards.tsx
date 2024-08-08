import { TExhibitChanges, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';

function ExhibitCards({ exhibits }: { exhibits: TExhibits | TExhibitChanges }) {
  return (
    <div className="c-entities c-exhibits">
      {exhibits.map((exhibit, i) => {
        return (
          <ExhibitCard exhibit={exhibit} key={i} />
        );
      })}
    </div>
  );
}

export default ExhibitCards;