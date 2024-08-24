import { RoundImage } from './stationImages';

function RoundsWidget({ rounds }: { rounds: number }) {

  return (
    <span className="c-station__rounds">
      <RoundImage />
      {rounds}
    </span>
  );
}

export default RoundsWidget;