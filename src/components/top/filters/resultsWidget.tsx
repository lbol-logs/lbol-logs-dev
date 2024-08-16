import { useTranslation } from 'react-i18next';

function ResultsWidget({ results }: { results: Array<string> }) {
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