import { ChangeEventHandler } from 'react';
import { toggleIsChecked } from 'utils/functions/helpers';
import { useTranslation } from 'react-i18next';
import SpellcardImage from 'components/common/utils/spellcardImage';

function SpellcardWidget({ onChange, spellcard, checked }: { onChange: ChangeEventHandler, spellcard: string, checked: boolean }) {
  const { t } = useTranslation();

  return (
    <label className={`p-filter__toggle ${toggleIsChecked(checked)} u-button`}>
      <SpellcardImage spellcard={spellcard} />
      <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="sc" value={spellcard} checked={checked} />
    </label>
  );
}

export default SpellcardWidget;