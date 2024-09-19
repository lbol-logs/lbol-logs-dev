import DefaultFilter from 'utils/classes/DefaultFilter';
import { compareArrays, copyObject, getResultType } from 'utils/functions/helpers';
import { TObj } from 'utils/types/common';
import { TFilter, TRunList, TRunListItem } from 'utils/types/others';
import { TRequests } from 'utils/types/runData';

function useFilterOnList(list: TRunList, currentFilter: TFilter) {
  let filteredList = copyObject(list);
  const map: TObj<keyof TRunListItem> = {
    ch: 'character',
    sc: 'type',
    st: 'shining',
    sw: 'shining',
    di: 'difficulty',
    rq: 'requests',
    re: 'result'
  };
  const texts = DefaultFilter.texts;
  const radios = DefaultFilter.radios;
  const keys = DefaultFilter.keys;

  for (const [key, f] of Object.entries(currentFilter)) {
    const isTexts = texts.includes(key);
    const isRadio = radios.includes(key);
    if (isTexts) {
      if (key === keys.na) {
        const value = (f as string).toLowerCase();
        filteredList = filteredList.filter(e => e.name && e.name.toLowerCase().includes(value));
      }
    }
    else if (isRadio) {
      if (key === keys.rt) {
        const value = f as string;
        if (value === DefaultFilter.rt.inactive) {
          filteredList = filteredList.filter(e => e.requests.length === 0);
        }
      }
    }
    else {
      const value = f as Array<string>;
      if (key === keys.sc) {
        filteredList = filteredList.filter(e => value.includes(e[map.ch] as string + e[map[key]] as string));
      }
      else if (key === keys.rq) {
        filteredList = filteredList.filter(e => compareArrays(value, e[map[key]] as TRequests));
      }
      else if (key === keys.re) {
        filteredList = filteredList.filter(e => value.includes(getResultType(e[map[key]] as string)));
      }
      else {
        filteredList = filteredList.filter(e => value.includes(e[map[key]] as string));
      }
    }
  }

  return filteredList;
}

export default useFilterOnList;