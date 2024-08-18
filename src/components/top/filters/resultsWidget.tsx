import { RunListContext } from 'contexts/runListContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleIsChecked } from 'utils/functions/helpers';

function ResultsWidget({ onChange, results }: { onChange: ChangeEventHandler, results: Array<string> }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { re } = filter;

  return (
    <>
      {results.map((result: string) => {
        const isChecked = re ? re.includes(result) : false;

        return (
          <label key={result}>
            <input type="checkbox" onChange={onChange} name="re" value={result} checked={isChecked} />
            {t(`results.${result}`, { ns: 'common' })}
          </label>
        );
      })}
    </>
  );
}

export default ResultsWidget;