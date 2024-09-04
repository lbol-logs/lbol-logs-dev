import { getRunList } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TRunList } from 'utils/types/others';

function useRunList(version: string) {
  const list = use(getRunList(version)) as TRunList;
  return list;
}

export default useRunList;