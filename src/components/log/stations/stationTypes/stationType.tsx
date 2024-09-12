import { TStation } from 'utils/types/runData';
import BattleStation from './battleStation';
import TempStation from './tempStation';
import EventStation from './eventStation';
import GapStation from './gapStation';
import EntryStation from './entryStation';
import SelectStation from './selectStation';
import SupplyStation from './supplyStation';
import ShopStation from './shopStation';
import TradeStation from './tradeStation';

function StationType({ station }: { station: TStation }) {
  const { Type } = station;

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
    case 'Shop':
      return <ShopStation station={station} />;
    case 'Trade':
      return <TradeStation station={station} />;
    default:
      return <TempStation station={station} />;
  }
}

export default StationType;