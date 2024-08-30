import { TStation } from 'utils/types/runData';
import EventDefault from '../events/eventDefault';
import DoremyPortal from '../events/DoremyPortal';
import JunkoColorless from '../events/JunkoColorless';

function EventStation({ station }: { station: TStation }) {
  const { Id } = station;

  switch (Id) {
    case 'DoremyPortal':
      return <DoremyPortal station={station} />;
    case 'JunkoColorless':
      return <JunkoColorless station={station} />;
    default:
      return <EventDefault station={station} />;
  }
}

export default EventStation;