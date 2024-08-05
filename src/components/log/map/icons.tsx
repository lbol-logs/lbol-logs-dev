import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj } from 'utils/types/runData';

function Icons({ ActObj }: { ActObj: TActObj }) {
  const { Act, Nodes } = ActObj;

  const { force } = checkForce(Nodes);

  const anchors = Nodes.map(node => {
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

    return (
      <img className="c-map-icon__img" key={`Act${Act}_x${X}y${Y}`} style={{ left: x, top: y}} alt={Type} />
    )
  });

  return (
    <div className="c-map-icon">
      {anchors}
    </div>
  );
}

export default Icons;