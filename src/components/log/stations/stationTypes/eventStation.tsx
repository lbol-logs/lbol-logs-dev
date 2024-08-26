import { TStation } from 'utils/types/runData';
import EventDefault from '../events/eventDefault';

function EventStation({ station }: { station: TStation }) {
  const { Id } = station;

  switch (Id) {
    // case 'ABC':
    //   break;
    default:
      return <EventDefault station={station} />;
  }
}

export default EventStation;