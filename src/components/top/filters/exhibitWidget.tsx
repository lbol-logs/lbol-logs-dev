import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getExhibitImage } from 'utils/functions/getImage';
import { toggleIsChecked } from 'utils/functions/helpers';

function ExhibitWidget({ onChange, exhibit, name, checked }: { onChange: ChangeEventHandler, exhibit: string, name: string, checked: boolean }) {
  const { t } = useTranslation();

  return (
    <label className={`p-filter__toggle ${toggleIsChecked(checked)} u-button`}>
      <LazyLoadImage2 callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
      <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name={name} value={exhibit} checked={checked} />
    </label>
  );
}

export default ExhibitWidget;