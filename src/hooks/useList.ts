import { getList } from 'utils/functions/fetchData';
import use from 'utils/functions/use';

function useList(version: string) {
  const list = use(getList(version));
  return list;
}

export default useList;