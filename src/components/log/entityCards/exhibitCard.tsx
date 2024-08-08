import Processing from 'components/common/processing';
import { iconSize } from 'configs/globals';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getExhibitImage } from 'utils/getImage';
import { TRange3 } from 'utils/types/common';
import { TExhibit, TExhibitChange, TExhibitObj } from 'utils/types/runData';

function ExhibitCard({ exhibit }: { exhibit: TExhibit | TExhibitChange }) {
  const isExhibitObj = typeof exhibit === 'object';
  const Id = isExhibitObj ? exhibit.Id : exhibit;
  let counter = null;
  if (isExhibitObj) {
    let lastCounter = <Processing />;
    const { runData, holdings } = useContext(LogContext);
    const { Act, Level } = runData.Stations[exhibit.Station].Node;
    const i = holdings.findIndex(({ Act: _act, Level: _level }) => Act === _act && Level === _level);
    if (i) {
      const exhibit: TExhibitObj = holdings[i - 1].Exhibits.find(({ Id }) => Id === exhibit.Id) as TExhibitObj;
      const { Counter } = exhibit;
      lastCounter = (
        <>
          {Counter}-{'>'}
        </>
      );
    }

    counter = (
      <span className="c-exhibit__counter">
        {lastCounter}{exhibit.Counter}
      </span>
    );
  }

  return (
    <span className={`c-entity c-exhibit`}>
      <LazyLoadImage className="c-exhibit__img" src={getExhibitImage(Id)} width={iconSize} height={iconSize}  alt={Id} />
      {Id}
      {counter}
    </span>
  );
}

export default ExhibitCard;