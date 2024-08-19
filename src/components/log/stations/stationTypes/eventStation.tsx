import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import ChoicesWidget from '../parts/choicesWidget';
import RoundsWidget from '../parts/roundsWidget';
import BattleStation from './battleStation';

function EventStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards } = station;
  const { t } = useTranslation();

  const { Choices } = Data;

  const choices = (
    <div>
      <ChoicesWidget id={Id as string} choices={Choices} />
    </div>
  );

  let data = null;

  switch (Id) {
    case 'MiyoiBartender':
      data = <BattleStation station={station} />;
      break;
    case 'YachieOppression':
      data = <BattleStation station={station} />;
      break;
    default:
      break;
  }

  return (
    <>
      <p>{t(Id as string, { ns: 'events' })}</p>
      {choices}
      {data}
    </>
  );
}

export default EventStation;