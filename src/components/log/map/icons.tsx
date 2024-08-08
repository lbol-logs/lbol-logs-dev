import { LazyLoadImage } from 'react-lazy-load-image-component';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj } from 'utils/types/runData';
import { getBossImage, getMapImage } from 'utils/getImage';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function Icons({ ActObj }: { ActObj: TActObj }) {
  const { level } = useContext(LogContext);
  const { Act, Nodes, Boss } = ActObj;

  const { force } = checkForce(Nodes);

  const { size } = MapNodes.mapOptions;

  const icons = Nodes.map(node => {
    const { X, Y, Type } = node;
    const [x, y] = MapNodes.node(X, Y, force);

    let src, _size, top;
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
      src = getBossImage(type);
      _size = size + delta;
      if (force) top = y - delta / 2;
      else top = y + delta / 2;
    }
    else {
      src = getMapImage(type);
      _size = size;
      if (force) top = y;
      else top = y + delta;
    }

    let visited = null;
    if (X <= level) visited = (
      <LazyLoadImage className="c-map-icon__visited" src={getMapImage('Visited')} width="10" height="10" alt="Visited" />
    );

/*  Types
		None,
		Enemy,
		EliteEnemy,
		Supply,
		Gap,
		Shop,
		Adventure,
		Entry,
		Select,
		Trade,
		Boss,
		BattleAdvTest
    */

    return (
      <div className={`c-map-icon ${isBoss ? 'c-map-icon--boss' : ''}`} key={`Act${Act}_x${X}y${Y}`} style={{ left, top }}>
        {visited}
        <LazyLoadImage className="c-map-icon__img" src={src} width={_size} height={_size} alt={type} />
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