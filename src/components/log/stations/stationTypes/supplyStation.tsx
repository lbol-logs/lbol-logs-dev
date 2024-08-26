import { TStation } from 'utils/types/runData';
import Supply from '../events/Supply';

function SupplyStation({ station }: { station: TStation }) {
  return <Supply station={station} />;
}

export default SupplyStation;