import { TStation } from 'utils/types/runData';
import Debut from '../events/Debut';

function EntryStation({ station }: { station: TStation }) {
  const { Data } = station;

  if (!Data) return null;

  return <Debut station={station} />;
}

export default EntryStation;