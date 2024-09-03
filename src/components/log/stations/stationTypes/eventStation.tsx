import { TStation } from 'utils/types/runData';
import { TObj } from 'utils/types/common';
import EventDefault from '../events/eventDefault';
import DoremyPortal from '../events/DoremyPortal';
import JunkoColorless from '../events/JunkoColorless';
import PatchouliPhilosophy from '../events/PatchouliPhilosophy';
import MiyoiBartender from '../events/MiyoiBartender';
import ShinmyoumaruForge from '../events/ShinmyoumaruForge';
import WatatsukiPurify from '../events/WatatsukiPurify';
import YorigamiSisters from '../events/YorigamiSisters';
import HatateInterview from '../events/HatateInterview';
import HinaCollect from '../events/HinaCollect';
import KogasaSpook from '../events/KogasaSpook';
import KosuzuBookstore from '../events/KosuzuBookstore';
import NarumiOfferCard from '../events/NarumiOfferCard';
import NazrinDetect from '../events/NazrinDetect';
import HecatiaTshirt from '../events/HecatiaTshirt';
import KeineSales from '../events/KeineSales';
import MikeInvest from '../events/MikeInvest';

type EventComponent = ({ station }: { station: TStation }) => JSX.Element;

function EventStation({ station }: { station: TStation }) {
  const events: TObj<EventComponent> = {
    DoremyPortal: DoremyPortal,
    JunkoColorless: JunkoColorless,
    PatchouliPhilosophy: PatchouliPhilosophy,
    MiyoiBartender: MiyoiBartender,
    ShinmyoumaruForge: ShinmyoumaruForge,
    WatatsukiPurify: WatatsukiPurify,
    YorigamiSisters: YorigamiSisters,
    HatateInterview: HatateInterview,
    HinaCollect: HinaCollect,
    KogasaSpook: KogasaSpook,
    KosuzuBookstore: KosuzuBookstore,
    NarumiOfferCard: NarumiOfferCard,
    NazrinDetect: NazrinDetect,
    HecatiaTshirt: HecatiaTshirt,
    KeineSales: KeineSales,
    MikeInvest: MikeInvest
  };
  const Id = station.Id as string;
  const EventComponent = Id in events ? events[Id] : EventDefault;

  return <EventComponent station={station} />;
}

export default EventStation;