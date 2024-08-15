import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getDifficultyImage } from 'utils/functions/getImage';
import { MouseEventHandler } from 'react';

function ResultsWidget({ onClick, results }: { onClick: MouseEventHandler, results: Array<string> }) {
  const { t } = useTranslation();

  return (
    <>
      {results.map((result: string) => {
        return (
          <label key={result}>
            <input type="checkbox" name="result" value={result} />
            {t(`results.${result}`, { ns: 'common' })}
          </label>
        );
      })}
    </>
  );
}

export default ResultsWidget;