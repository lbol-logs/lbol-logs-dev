import { LazyLoadImage } from 'react-lazy-load-image-component';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj } from 'utils/types/runData';
import { getMapImage } from 'utils/getImage';

function Icons({ ActObj }: { ActObj: TActObj }) {
  const { Act, Nodes } = ActObj;

  const { force } = checkForce(Nodes);

  const { size } = MapNodes.mapOptions;

  const icons = Nodes.map(node => {
    const { X, Y, Type } = node;
    const [x, y] = MapNodes.node(X, Y, force);

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
      <LazyLoadImage className="c-map-icon__img" src={getMapImage(Type)} width={size} height={size} key={`Act${Act}_x${X}y${Y}`} style={{ left: x, top: y}} alt={Type} />
    )
  });

  return (
    <div className="c-map-icon">
      {icons}
    </div>
  );
}

export default Icons;