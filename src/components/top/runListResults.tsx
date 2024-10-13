import { Trans, useTranslation } from 'react-i18next';
import { getLength } from 'utils/functions/helpers';
import { TRunList } from 'utils/types/others';

function RunListResults({ list, filteredList }: { list: TRunList, filteredList: TRunList }) {
  useTranslation();

  const found = <Trans
    i18nKey="results.found"
    ns="runList"
    count={getLength(filteredList)}
  />;
  const total = <Trans
    i18nKey="results.total"
    ns="runList"
    count={getLength(list)}
  />;
  const results = <Trans
    i18nKey="results.format"
    ns="runList"
    components={{ found, total }}
  />;

  return (
    <p className="p-run-list__results">{results}</p>
  );
}

export default RunListResults;