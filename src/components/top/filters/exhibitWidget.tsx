import { ChangeEventHandler } from 'react';
import { toggleIsChecked } from 'utils/functions/helpers';
import ExhibitImage from 'components/common/parts/exhibitImage';
import { TExhibit } from 'utils/types/runData';

function ExhibitWidget({ onChange, exhibit, name, checked }: { onChange: ChangeEventHandler, exhibit: TExhibit, name: string, checked: boolean }) {
  return (
    <label className={`p-filter__toggle ${toggleIsChecked(checked)} u-button`}>
      <ExhibitImage exhibit={exhibit} />
      <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name={name} value={exhibit} checked={checked} />
    </label>
  );
}

export default ExhibitWidget;