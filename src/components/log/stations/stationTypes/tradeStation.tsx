import { TStation } from 'utils/types/runData';
import RinnosukeTrade from '../events/RinnosukeTrade';
import SumirekoGathering from '../events/SumirekoGathering';

function TradeStation({ station }: { station: TStation }) {
  const { Act } = station.Node;
  if (Act === 2) return <RinnosukeTrade station={station} />;
  else return <SumirekoGathering station={station} />;
}

export default TradeStation;