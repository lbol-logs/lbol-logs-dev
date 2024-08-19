import { TStation } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import ChoicesWidget from '../parts/choicesWidget';
import BattleStation from './battleStation';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { iconSize } from 'configs/globals';
import { getEventImage } from 'utils/functions/getImage';

function EventStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards } = station;
  const { t } = useTranslation();

  const { Choices, Battle } = Data;
  const id = Id as string;

  const choices = (
    <div>
      <ChoicesWidget id={id} choices={Choices} />
    </div>
  );

  const additionalElements: Array<JSX.Element> = [];

  if (Battle) {
    additionalElements.push(
      <BattleStation station={station} />
    );
  }

  const size = iconSize * 2;

  return (
    <div className="p-event">
      <div className="p-event__head">
        <LazyLoadImage2 className="p-event__img" callback={getEventImage} name={id} width={size} height={size} alt={''} />
        <div className="p-event__text">
          <p className="p-event__title">{t(`${id}.Title`, { ns: 'events' })}</p>
          <p className="p-event__host">{t(`${id}.Host`, { ns: 'events' })}</p>
        </div>
      </div>
      <div className="p-event__body">
        {choices}
        {additionalElements}
      </div>
    </div>
  );
}

export default EventStation;