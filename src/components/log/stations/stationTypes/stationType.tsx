import { TStation } from 'utils/types/runData';
import BattleStation from './battleStation';
import TempStation from './tempStation';
import EventStation from './eventStation';

function StatationType({ station }: { station: TStation }) {
  const { Type } = station;

  const battleStations = ['Enemy', 'Elite', 'Boss'];
  if (battleStations.includes(Type)) return <BattleStation station={station} />;
  else if (Type === 'Adventure') return <EventStation station={station} />;
  else return <TempStation station={station} />;
}

export default StatationType;