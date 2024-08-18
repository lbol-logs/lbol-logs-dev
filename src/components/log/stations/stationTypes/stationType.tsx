import { TStation } from 'utils/types/runData';
import BattleStation from './battleStation';
import TempStation from './tempStation';
import EventStation from './eventStation';
import GapStation from './gapStation';

function StationType({ station }: { station: TStation }) {
  const { Type } = station;

  // TODO

	switch (Type) {
		case 'Enemy':
		case 'EliteEnemy':
		case 'Boss':
			return <BattleStation station={station} />;
		case 'Adventure':
			return <EventStation station={station} />;
		// Supply,
		case 'Gap':
			return <GapStation station={station} />;
		// Shop,
		// Adventure,
		// Entry,
		// Select,
		// Trade,
		default:
			return <TempStation station={station} />;
	}
}

export default StationType;