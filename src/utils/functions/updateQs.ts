import { SetURLSearchParams } from 'react-router-dom';
import { TObjString } from 'utils/types/common';
import { TRounds } from 'utils/types/others';
import { TAct, TLevel } from 'utils/types/runData';

function updateQs(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams, a: TAct, l: TLevel, rounds: TRounds) {
  const o: TObjString = {};
  if (a) o['a'] = a.toString();
  else searchParams.delete('a');
  if (l) o['l'] = l.toString();
  else searchParams.delete('l');

  const { current, maxLevel } = rounds;
  if (l === maxLevel && current >= 0) o['r'] = current.toString();
  else searchParams.delete('r');

  setSearchParams(o, { replace: true });
}

export default updateQs;