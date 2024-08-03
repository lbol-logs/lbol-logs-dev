import MapNodes from 'utils/MapNodes';
import { TActObj, TNodeY } from 'utils/types';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { Act, Nodes } = ActObj;

  const { length, gap, colors, widths } = MapNodes.mapOptions;

  const nodesY: Array<TNodeY> = [];
  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;
    if (Y && !nodesY.includes(Y)) nodesY.push(Y);
    return Followers.map(Follower => {
      const X2 = X + 1;
      const Y2 = Follower as TNodeY;
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2);
      // TODO: color, width
      return (
        <line key={`Act${Act}_x${X}y${Y}_x${X2}y${Y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.normal} strokeWidth={widths.normal}></line>
      );
    });
  });

  const width = (length + gap) * Nodes[Nodes.length - 1].X + gap;
  const height = gap * (Math.max(1, nodesY.length));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {/* TODO: additionalLines */}
    </svg>
  );
}

export default Svg;