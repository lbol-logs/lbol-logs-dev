import { TEventComponent, TStation } from 'utils/types/runData';
import Debut from '../events/Debut';
import RewardsWidget from '../parts/rewardsWidget';
import { TObj } from 'utils/types/common';

function EntryStation({ station }: { station: TStation }) {
  const events: TObj<TEventComponent> = {
    Debut: Debut
  };

  const Id = station.Id as string;
  if (!(Id in events)) return <RewardsWidget station={station} />;
  
  const EventComponent = events[Id];

  return <EventComponent station={station} />;
}

export default EntryStation;