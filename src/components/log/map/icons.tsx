import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { checkForce } from 'utils/functions/helpers';
import MapNodes from 'utils/classes/MapNodes';
import { TActObj } from 'utils/types/runData';
import { getBossImage, getMapImage } from 'utils/functions/getImage';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { useTranslation } from 'react-i18next';
import { iconSize } from 'configs/globals';

function Icons({ ActObj }: { ActObj: TActObj }) {
  const { runData, level } = useContext(LogContext);
  const { Act, Nodes, Boss } = ActObj;
  const stations = runData.Stations.map(({ Node }) => Node);
  const currentActStations = stations.filter(({ Act: _act }) => Act === _act);
  const { force } = checkForce(Nodes);
  const { size } = MapNodes.mapOptions;
  const { t } = useTranslation();

  const icons = Nodes.map(node => {
    const { X, Y, Type } = node;
    const [x, y] = MapNodes.node(X, Y, force);

    let callback, _size, top;
    let type: string = Type;
    const isBoss = type === 'Boss';

    const left = x;
    const delta = size / 2;

    if (isBoss) {
      if (Act === 1) {
        if (Boss && level >= 5) type = Boss;
        else type = 'Unknown';
      }
      else {
        type = Boss as string;
      }
      callback = getBossImage;
      _size = size + size;
      if (force) top = y - delta;
      else top = y + delta;
    }
    else {
      if (type === 'Enemy') {
        if (X > 10) type += 'Strong';
        type += 2 - X % 2;
      }
      if (type === 'Trade') type += Act;
      callback = getMapImage;
      _size = size;
      if (force) top = y;
      else top = y + delta * 2;
    }

    let visited = null;
    let isActive = false;
    if (X <= level) {
      const station = currentActStations.find(({ Level, Y: _y }) => Level === X && _y === Y);
      if (station) {
        const size = iconSize / 2;
        visited = (
          <LazyLoadImage2 className="c-map-icon__visited" callback={getMapImage} name="Visited" width={size} height={size} alt={t('stations.Visited', { ns: 'log' })} />
        );
        if (X === level) isActive = true;
      }
    }

    return (
      <div className={`c-map-icon ${isBoss ? 'c-map-icon--boss' : ''}`} key={`Act${Act}_x${X}y${Y}`} style={{ left, top }}>
        <LazyLoadImage2 className={`c-map-icon__bg ${isActive ? 'c-map-icon__bg--active' : ''}`} callback={getMapImage} name="bg" width={_size} height={_size} alt="" />
        <LazyLoadImage2 className="c-map-icon__img" callback={callback} name={type} width={_size} height={_size} alt={t(`stations.${Type}`, { ns: 'log' })} />
        {visited}
      </div>
    );
  });

  return (
    <div className="c-map-icons">
      {icons}
    </div>
  );
}

export default Icons;