import { RunListContext } from 'contexts/runListContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { TFilterRadio } from 'utils/types/others';
import { TExhibit } from 'utils/types/runData';

function ExhibitsTypes({ onChange, startingExhibit, swappedExhibit }: { onChange: ChangeEventHandler, startingExhibit: TExhibit, swappedExhibit: TExhibit }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { sc } = filter;
  const { et } = filter as TFilterRadio;

  const o = {
    all: t('all', { ns: 'runList' }),
    startingExhibit,
    swappedExhibit
  };
  const defaultType = DefaultFilter.check(DefaultFilter.keys.et);
  const hasSpellcard = sc ? sc.length : false;

  return (
    <>
      {Object.entries(o).map(([value, text]) => {
        if (hasSpellcard && text === startingExhibit) return null;
        const isChecked = (et || defaultType) === value;

        return (
          <label key={value}>
            <input type="radio" name="et" value={value} onChange={onChange} checked={isChecked} />
            {text}
          </label>
        );
      })}
    </>
  );
}

export default ExhibitsTypes;