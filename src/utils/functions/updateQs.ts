import { SetURLSearchParams } from 'react-router-dom';
import { TObjString } from 'utils/types/common';
import { TAct, TLevel } from 'utils/types/runData';

function updateQs(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, a: TAct, l?: TLevel) {
  const o: TObjString = {};
  if (a) o['a'] = a.toString();
  else searchParams.delete('a');
  if (l) o['l'] = l.toString();
  else searchParams.delete('l');
  setSearchParams(o, { replace: true });
}

export default updateQs;