import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEvent, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TObj } from 'utils/types/common';

function ShowDiff() {
  const { showDiff, setShowDiff } = useContext(CardPoolContext);
  const { t } = useTranslation();

  const values: TObj<boolean> = {
    active: true,
    inactive: false
  };

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setShowDiff(values[e.target.value]);
  }

  return (
    <>
      {Object.entries(values).map(([value, bool]) => {
        const isChecked = showDiff === bool;

        return (
          <label key={value}>
            <input type="radio" onChange={onChange} name="sd" value={value} checked={isChecked} />
            {t(value, { ns: 'runList', context: 'pool' })}
          </label>
        );
      })}
    </>
  );
}

export default ShowDiff;