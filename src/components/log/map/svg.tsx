import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj, TNodeY } from 'utils/types/runData';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { runData, level } = useContext(LogContext);
  // TODO: stations
  const { Act, Nodes } = ActObj;

  const { length, gap, colors, widths } = MapNodes.mapOptions;

  const { nodesY, force } = checkForce(Nodes);
  const h = force ? nodesY.filter(Y => Y).length : 1;

  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;
    let w: number;
    if (level === X) w = widths.active;
    else if (level < X) w = widths.taken;
    else w = widths.normal;
    return Followers.map(Follower => {
      const X2 = X + 1;
      const Y2 = Follower as TNodeY;
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2, force);
      // TODO: color, width using stations
      return (
        <line key={`Act${Act}_x${X}y${Y}_x${X2}y${Y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.normal} strokeWidth={w}></line>
      );
    });
  });

  const width = (length + gap) * Nodes[Nodes.length - 1].X + gap;
  const height = gap * (Math.max(1, h));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {/* TODO: additionalLines */}
    </svg>
  );
}

export default Svg;