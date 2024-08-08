import { LazyLoadImage } from 'react-lazy-load-image-component';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj } from 'utils/types/runData';
import { getMapImage } from 'utils/getImage';
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

    let src, _size, _x, _y;
    let type: string = Type;
    if (type === 'Boss') {
      if (Act === 1) {
        if (Boss && level >= 5) type = Boss;
        else type = 'Unknown';
      }
      else {
        type = Boss as string;
      }
      src = getBossImage(type);
      _size = size * 2;
      _x = x;
      _y = y - (_size - size) / 2;
    }
    else {
      src = getMapImage(type);
      _size = size;
      _x = x;
      _y = y;
    }

    let visited = null;
    if (X < level) visited = (
      <LazyLoadImage className="c-map-icon__img" src={getMapImage('Visited')} width="10" height="10" alt="Visited" />
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

    // TODO: Boss icon & change after choose

    return (
      <div className="c-map-icon">
        {visited}
        <LazyLoadImage className="c-map-icon__img" src={src} width={_size} height={_size} key={`Act${Act}_x${X}y${Y}`} style={{ left: _x, top: _y}} alt={type} />
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

function getBossImage(type: string): any {
  throw new Error('Function not implemented.');
}
