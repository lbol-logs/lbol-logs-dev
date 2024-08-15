import { TStation } from 'utils/types/runData';
import BattleStation from './battleStation';
import TempStation from './tempStation';
import EventStation from './eventStation';

function StationType({ station }: { station: TStation }) {
  const { Type } = station;

  // TODO
/*  Types
		None,
		Enemy,
		EliteEnemy,
		Supply,
		Gap,
		Shop,
		Adventure,
		Entry,
		Select,
		Trade,
		Boss,
		BattleAdvTest
    */

	switch (Type) {
		case 'Enemy':
		case 'EliteEnemy':
		case 'Boss':
			return <BattleStation station={station} />;
		case 'Adventure':
			return <EventStation station={station} />;
		// Supply,
		// Gap,
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