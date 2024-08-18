import DefaultFilter from 'utils/classes/DefaultFilter';
import { compareArrays, copyObject, filterObject } from 'utils/functions/helpers';
import { TObjAny, TObjString } from 'utils/types/common';
import { TFilter, TRunList } from 'utils/types/others';

function useFilterOnList(list: TRunList, currentFilter: TFilter) {
  let filteredList = copyObject(list);
  const map: TObjString = {
    ch: 'character',
    st: 'shining',
    sw: 'shining',
    di: 'difficulty',
    rq: 'requests',
    re: 'result'
  };
  const radios = DefaultFilter.radios;
  const keys = DefaultFilter.keys;

  for (const [key, f] of Object.entries(currentFilter)) {
    const isRadio = radios.includes(key);
    if (isRadio) {
      if (key === keys.rt) {
        const value = f as string;
        if (value === DefaultFilter.rt.inactive) {
          filteredList = filterObject(filteredList, (o: TObjAny) => o.requests.length === 0);
        }
      }
    }
    else {
      const value = f as Array<string>;
      if (key === keys.rq) {
        filteredList = filterObject(filteredList, (o: TObjAny) => compareArrays(value, o[map[key]]));
      }
      else {
        filteredList = filterObject(filteredList, (o: TObjAny) => value.includes(o[map[key]]));
      }
    }
  }

  return filteredList;
}

export default useFilterOnList;