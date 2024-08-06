import { TExhibits } from 'utils/types/runData';
import ExhibitR from './exhibitR';

function ExhibitsR({ exhibits }: { exhibits: TExhibits }) {
  return (
    <div className="c-exhibits">
      {exhibits.map((exhibit, i) => {
        return (
          <ExhibitR exhibit={exhibit} key={i} />
        );
      })}
    </div>
  );
}

export default ExhibitsR;