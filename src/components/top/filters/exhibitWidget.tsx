import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getExhibitImage } from 'utils/functions/getImage';

function ExhibitWidget({ onClick, exhibit }: { onClick: MouseEventHandler, exhibit: string }) {
  const { t } = useTranslation();

  return (
    <label className="p-filter__toggle u-button">
      <LazyLoadImage2 callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
      <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="exhibit" value={exhibit} />
    </label>
  )
}

export default ExhibitWidget;