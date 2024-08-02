import MapNodes from 'utils/MapNodes';
import { TActObj } from 'utils/types';

function Icons({ ActObj }: { ActObj: TActObj }) {
  const { Act, Nodes } = ActObj;

  const anchors = Nodes.map(node => {
    const { X, Y, Type } = node;
    const [x, y] = MapNodes.node(X, Y);

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
      <a className="c-map__icon" key={`Act${Act}_x${X}y${Y}`} style={{ left: x, top: y}}>
        {Type}
      </a>
    )
  });

  return (
    <>
      {anchors}
    </>
  );
}

export default Icons;