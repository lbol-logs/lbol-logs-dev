import { TExhibitChanges, TExhibitObjs, TExhibits } from 'utils/types/runData';
import ExhibitCard from './exhibitCard';
import { TObjNumber } from 'utils/types/common';
import { getExhibitId } from 'utils/functions/helpers';
import { Fragment } from 'react/jsx-runtime';

function ExhibitCards({ exhibits, added, prices }: { exhibits: TExhibits | TExhibitObjs | TExhibitChanges, added?: Array<number>, prices?: TObjNumber }) {
  return (
    <div className="c-entities c-exhibits">
      {exhibits.map((exhibit, i) => {
        const isNotAdded = Boolean(added && !added.includes(i));
        let price;
        if (prices) {
          const Id = getExhibitId(exhibit);
          if (Id in prices) {
            price = (
              <span className="c-price">
                {prices[Id]}
              </span>
            );
          }
        }

        return (
          <Fragment key={i}>
            <ExhibitCard exhibit={exhibit} isNotAdded={isNotAdded} />
            {price}
          </Fragment>
        );
      })}
    </div>
  );
}

export default ExhibitCards;