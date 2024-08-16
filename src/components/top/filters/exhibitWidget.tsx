import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getExhibitImage } from 'utils/functions/getImage';

function ExhibitWidget({ onChange, exhibit }: { onChange: ChangeEventHandler, exhibit: string }) {
  const { t } = useTranslation();

  return (
    <label className="p-filter__toggle u-button">
      <LazyLoadImage2 callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
      <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="exhibit" value={exhibit} />
    </label>
  );
}

export default ExhibitWidget;