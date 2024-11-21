import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultFilter from 'utils/classes/DefaultFilter';
import DefaultPool from 'utils/classes/DefaultPool';
import { TPoolRadio } from 'utils/types/others';
import { TExhibit } from 'utils/types/runData';

function FilterTypes({ onChange }: { onChange: ChangeEventHandler }) {
  const { t } = useTranslation();
  const { filter } = useContext(CardPoolContext);
  const { ft } = filter as TPoolRadio;

  const o = {
    all: t('all', { ns: 'runList' }),
    custom: t('custom', { ns: 'site' }),
    ...Object.keys(DefaultPool.CardFilters).reduce((a, b) => Object.assign(a, { [b]: t(`${b}.Name`, { ns: 'cards' }) }), {})
  };
  const defaultType = DefaultPool.check(DefaultPool.keys.ft);

  return (
    <>
      {Object.entries(o).map(([value, text]) => {
        const isChecked = (ft || defaultType) === value;

        return (
          <label key={value}>
            <input type="radio" name="ft" value={value} onChange={onChange} checked={isChecked} />
            {text}
          </label>
        );
      })}
    </>
  );
}

export default FilterTypes;