import { TStation } from 'utils/types/runData';
import Select from '../events/Select';

function SelectStation({ station }: { station: TStation }) {
  const { Data } = station;

  if (!Data) return null;
  
  return <Select station={station} />;
}

export default SelectStation;