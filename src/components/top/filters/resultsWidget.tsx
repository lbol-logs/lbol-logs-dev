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
          <label className="p-filter__toggle u-button" key={result}>
            <LazyLoadImage2 callback={getDifficultyImage} name={result} alt={t(`results.${result}`, { ns: 'common' })} />
            <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="result" value={result} />
          </label>
        );
      })}
    </>
  );
}

export default ResultsWidget;