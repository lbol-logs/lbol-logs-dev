import { ChangeEventHandler } from 'react';
import { toggleIsChecked } from 'utils/functions/helpers';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getSpellcardImage } from 'utils/functions/getImage';
import { useTranslation } from 'react-i18next';

function SpellcardWidget({ onChange, spellcard, checked }: { onChange: ChangeEventHandler, spellcard: string, checked: boolean }) {
  const { t } = useTranslation();

  return (
    <label className={`p-filter__toggle ${toggleIsChecked(checked)} u-button`}>
      <LazyLoadImage2 callback={getSpellcardImage} name={spellcard} alt={t(`spellcards.${spellcard}`, { ns: 'common' })} />
      <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="sc" value={spellcard} checked={checked} />
    </label>
  );
}

export default SpellcardWidget;