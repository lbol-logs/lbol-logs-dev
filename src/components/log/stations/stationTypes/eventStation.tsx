import { TStation } from 'utils/types/runData';
import EventDefault from '../events/eventDefault';
import DoremyPortal from '../events/DoremyPortal';
import JunkoColorless from '../events/JunkoColorless';
import PatchouliPhilosophy from '../events/PatchouliPhilosophy';
import MiyoiBartender from '../events/MiyoiBartender';
import ShinmyoumaruForge from '../events/ShinmyoumaruForge';

function EventStation({ station }: { station: TStation }) {
  const { Id } = station;

  switch (Id) {
    case 'DoremyPortal':
      return <DoremyPortal station={station} />;
    case 'JunkoColorless':
      return <JunkoColorless station={station} />;
    case 'PatchouliPhilosophy':
      return <PatchouliPhilosophy station={station} />;
    case 'MiyoiBartender':
      return <MiyoiBartender station={station} />;
    case 'ShinmyoumaruForge':
      return <ShinmyoumaruForge station={station} />;
    default:
      return <EventDefault station={station} />;
  }
}

export default EventStation;