import { TStation } from 'utils/types/runData';
import SelectOpponent from '../events/SelectOpponent';

function SelectStation({ station }: { station: TStation }) {
  const { Data } = station;

  if (!Data) return null;

  return <SelectOpponent station={station} />;
}

export default SelectStation;