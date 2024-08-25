import { TStation } from 'utils/types/runData';
import BattleStation from './battleStation';
import TempStation from './tempStation';
import EventStation from './eventStation';
import GapStation from './gapStation';
import EntryStation from './entryStation';
import SelectStation from './selectStation';
import SupplyStation from './supplyStation';

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
		case 'Gap':
			return <GapStation station={station} />;
		case 'Entry':
			return <EntryStation station={station} />;
		case 'Select':
			return <SelectStation station={station} />;
		case 'Supply':
			return <SupplyStation station={station} />;

		// Shop,
		// Adventure,
		// Trade,
		
		default:
			return <TempStation station={station} />;
	}
}

export default StationType;