import copyObject from 'utils/functions/helpers';
import { TFilter, TRunList } from 'utils/types/others';

function useFilterOnList(list: TRunList, filter: TFilter) {
  let filteredList = copyObject(list);

  console.log({filter});

  return filteredList;
}

export default useFilterOnList;