import { TExhibitChanges, TExhibitObjs, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';
import { TObjNumber } from 'utils/types/common';
import { getExhibitId } from 'utils/functions/helpers';

function ExhibitCards({ exhibits, added, prices }: { exhibits: TExhibits | TExhibitObjs | TExhibitChanges, added?: Array<number>, prices?: TObjNumber }) {
  return (
    <div className="c-entities c-exhibits">
      {exhibits.map((exhibit, i) => {
        const isNotAdded = Boolean(added && !added.includes(i));
        if (prices === undefined) {
          return (
            <ExhibitCard exhibit={exhibit} isNotAdded={isNotAdded} key={i} />
          );
        }
        else {
          const Id = getExhibitId(exhibit);
          const price = prices[Id];
          return (
            <div className="c-entity--with-price" key={i}>
              <ExhibitCard exhibit={exhibit} isNotAdded={isNotAdded} />
              <span className="c-price">
                {price}
              </span>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ExhibitCards;