import { RoundWidget } from './stationWidgets';

function RoundsWidget({ rounds }: { rounds: number }) {

  return (
    <span className="c-station__rounds">
      <RoundWidget />
      {rounds}
    </span>
  );
}

export default RoundsWidget;