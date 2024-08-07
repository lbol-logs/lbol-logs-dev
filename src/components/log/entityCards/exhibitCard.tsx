import { iconSize } from 'configs/globals';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getExhibitImage } from 'utils/getImage';
import { TExhibit, TExhibitObj } from 'utils/types/runData';

function ExhibitCard({ exhibit }: { exhibit: TExhibit | TExhibitObj }) {
  const isExhibitObj = typeof exhibit === 'object';
  const Id = isExhibitObj ? exhibit.Id : exhibit;
  let counter = null;
  if (isExhibitObj) {
    counter = (
      <span className="c-exhibit__counter">
        {exhibit.Counter}
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