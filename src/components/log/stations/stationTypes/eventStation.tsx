import { TStation } from 'utils/types/runData';
import EventDefault from '../events/eventDefault';
import DoremyPortal from '../events/DoremyPortal';

function EventStation({ station }: { station: TStation }) {
  const { Id } = station;

  switch (Id) {
    case 'DoremyPortal':
      return <DoremyPortal station={station} />;
    default:
      return <EventDefault station={station} />;
  }
}

export default EventStation;