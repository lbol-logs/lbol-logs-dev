import { TStation } from 'utils/types/runData';
import CurrentChange from '../currentChange';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import ChoicesWidget from '../parts/choicesWidget';
import { useTranslation } from 'react-i18next';
import { getEnemyImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';

function EntryStation({ station }: { station: TStation }) {
  const { Data, Node: { Level }} = station;
  const { t } = useTranslation();

  if (!Data) return null;

  const { Choices } = Data;

  const id = 'Debut';

  const choices = (
    <div>
      <ChoicesWidget id={id} choices={Choices} />
    </div>
  );

  const additionalElements = (
    null
  );

  const size = iconSize * 2;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__head">
            <LazyLoadImage2 className="p-event__img" callback={getEnemyImage} name="Eirin" width={size} height={size} alt={''} />
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
      </div>
      <div className="p-entities">
        <CurrentChange level={Level} />
      </div>
    </div>
  );
}

export default EntryStation;