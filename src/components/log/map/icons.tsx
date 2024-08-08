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

    let type: string = Type;
    if (type === 'Boss') {
      if (Act === 1) {
        if (Boss && level >= 5) type = Boss;
        else type = 'Unknown';
      }
      else {
        type = Boss as string;
      }
    }

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
      <LazyLoadImage className="c-map-icon__img" src={getMapImage(type)} width={size} height={size} key={`Act${Act}_x${X}y${Y}`} style={{ left: x, top: y}} alt={type} />
    );
  });

  return (
    <div className="c-map-icon">
      {icons}
    </div>
  );
}

export default Icons;