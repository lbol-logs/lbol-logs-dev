import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getEventImage } from 'utils/functions/getImage';

function EventHead({ id, callback, name }: { id: string, callback?: Function, name?: string }) {
  const { t } = useTranslation();

  const size = iconSize * 2;

  return (
    <div className="p-event__head">
      <LazyLoadImage2 className="p-event__img" callback={callback || getEventImage} name={name || id} width={size} height={size} alt="" />
      <div className="p-event__text">
        <p className="p-event__title">{t(`${id}.Title`, { ns: 'events' })}</p>
        <p className="p-event__host">{t(`${id}.Host`, { ns: 'events' })}</p>
      </div>
    </div>
  );
}

export default EventHead;