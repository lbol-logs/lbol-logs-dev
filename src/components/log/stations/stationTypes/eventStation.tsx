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
import YoumuDelivery from '../events/YoumuDelivery';
import RemiliaMeet from '../events/RemiliaMeet';
import RingoEmp from '../events/RingoEmp';
import YachieOppression from '../events/YachieOppression';
import AssistKagerou from '../events/AssistKagerou';
import EternityAscension from '../events/EternityAscension';
import KaguyaVersusMokou from '../events/KaguyaVersusMokou';
import MystiaBbq from '../events/MystiaBbq';
import ParseeJealousy from '../events/ParseeJealousy';
import RumiaDriving from '../events/RumiaDriving';

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
    MikeInvest: MikeInvest,
    YoumuDelivery: YoumuDelivery,
    RemiliaMeet: RemiliaMeet,
    RingoEmp: RingoEmp,
    YachieOppression: YachieOppression,
    AssistKagerou: AssistKagerou,
    EternityAscension: EternityAscension,
    KaguyaVersusMokou: KaguyaVersusMokou,
    MystiaBbq: MystiaBbq,
    ParseeJealousy: ParseeJealousy,
    RumiaDriving: RumiaDriving
  };
  const Id = station.Id as string;
  const EventComponent = Id in events ? events[Id] : EventDefault;

  return <EventComponent station={station} />;
}

export default EventStation;