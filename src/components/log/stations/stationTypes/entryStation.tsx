import { TStation } from 'utils/types/runData';
import Debut from '../events/Debut';
import RewardsWidget from '../parts/rewardsWidget';

function EntryStation({ station }: { station: TStation }) {
  const { Data } = station;

  if (Data) return <Debut station={station} />;
  else return <RewardsWidget station={station} />;
}

export default EntryStation;