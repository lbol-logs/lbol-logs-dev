import { RunListContext } from 'contexts/runListContext';
import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pager from 'utils/classes/Pager';

function RunListResults() {
  const { filteredList } = useContext(RunListContext);
  const [searchParams] = useSearchParams();

  const pager = new Pager(filteredList, searchParams);
  const { min, max, count } = pager;

  const range = count ? `${max + 1} - ${min + 1}` : 0;
  const results = `${range} / ${count}`;

  return (
    <p className="p-run-list__results">{results}</p>
  );
}

export default RunListResults;