import { RunListContext } from 'contexts/runListContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { TFilterRadio } from 'utils/types/others';

function ExhibitsTypes({ onChange, startingExhibit, swappedExhibit }: { onChange: ChangeEventHandler, startingExhibit: string, swappedExhibit: string }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { et } = filter as TFilterRadio;

  const defaultType = DefaultFilter.check(DefaultFilter.keys.et)
  const o = {
    all: t('all', { ns: 'runList' }),
    startingExhibit: startingExhibit,
    swappedExhibit: swappedExhibit
  };

  return (
    <>
      {Object.entries(o).map(([value, text]) => {
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