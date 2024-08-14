import { getRunList } from 'utils/functions/fetchData';
import use from 'utils/functions/use';

function useRunList(version: string) {
  const list = use(getRunList(version));
  return list;
}

export default useRunList;