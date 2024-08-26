import { TExhibits } from 'utils/types/runData';
import { Fragment } from 'react/jsx-runtime';
import ExhibitImage from './exhibitImage';

function ExhibitImages({ exhibits, className, alt }: { exhibits: TExhibits, className?: string, alt?: string }) {
  return (
    <>
      {exhibits.map(exhibit => 
        <Fragment key={exhibit}>
          <ExhibitImage exhibit={exhibit} className={className} alt={alt} />
        </Fragment>
      )}
    </>
  );
}

export default ExhibitImages;