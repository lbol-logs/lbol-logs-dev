import DefaultFilter from 'utils/classes/DefaultFilter';
import { copyObject, filterObject } from 'utils/functions/helpers';
import { TFilter, TRunList } from 'utils/types/others';

function useFilterOnList(list: TRunList, currentFilter: TFilter) {
  let filteredList = copyObject(list);
  for (const [key, f] of Object.entries(currentFilter)) {
    const isRadio = DefaultFilter.radios.includes(key);
    const v = isRadio ? f as string : f as Array<string>;
    switch (key) {
      case DefaultFilter.keys.ch:
        filteredList = filterObject(filteredList, ({ character }: { character: string }) => v.includes(character));
        break;
      case DefaultFilter.keys.st:
        filteredList = filterObject(filteredList, ({ shining }: { shining: string }) => v.includes(shining));
        break;
      case DefaultFilter.keys.sw:
        filteredList = filterObject(filteredList, ({ shining }: { shining: string }) => v.includes(shining));
        break;
      default:
        break;
    }
  }
  console.log({currentFilter});

  return filteredList;
}

export default useFilterOnList;