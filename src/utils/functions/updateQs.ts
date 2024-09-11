import { SetURLSearchParams } from 'react-router-dom';
import { TObjString } from 'utils/types/common';
import { TRounds } from 'utils/types/others';
import { TAct, TLevel } from 'utils/types/runData';

function updateQs(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, a: TAct, l?: TLevel, r?: number, rounds?: TRounds) {
  const o: TObjString = {};
  if (a) o['a'] = a.toString();
  else searchParams.delete('a');
  if (l) o['l'] = l.toString();
  else searchParams.delete('l');

console.log({r,rounds})
  // if (r !== undefined) {
  //   o['r'] = r.toString();
  // }
  // else {
  //   if (rounds === undefined) {
  //     const _r = searchParams.get('r');
  //     console.log({_r});
  //     if (_r !== null) o['r'] = _r;
  //   }
  // }

  setSearchParams(o, { replace: true });
}

export default updateQs;