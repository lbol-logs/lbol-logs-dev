import { RunListContext } from 'contexts/runListContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Pager from 'utils/classes/Pager';
import { getLength } from 'utils/functions/helpers';

function RunListResults() {
  const { list, filteredList } = useContext(RunListContext);
  const [searchParams] = useSearchParams();
  useTranslation();

  const pager = new Pager(filteredList, searchParams);
  const { min, max, count } = pager;

  const range = count ? `${min + 1} - ${max + 1}` : 0;
  const results = `${range} / ${count}`;

  return (
    <p className="p-run-list__results">{results}</p>
  );
}

export default RunListResults;