import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { TActObj, TLevel, TNodeObj, TNodeY, TStation } from 'utils/types/runData';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { runData, level } = useContext(LogContext);
  // TODO: stations
  const { Act, Nodes } = ActObj;

  const { length, gap, colors, widths } = MapNodes.mapOptions;

  const { nodesY, force } = checkForce(Nodes);
  const h = force ? nodesY.filter(Y => Y).length : 1;

  const currentActStations = runData.Stations.map(({ Node }) => Node).filter(({ Act: _act }) => _act === Act);
  function getStationY(level: TLevel) {
    const station = currentActStations.find(({ Level }) => Level === level) as TNodeObj;
    return station.Y;
  }

  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;

    return Followers.map(Follower => {
      const X2 = X + 1;
      const Y2 = Follower as TNodeY;
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2, force);

      let flag = 'normal';

      const currentStationY = getStationY(X);
      // TODO: 羽根
      if (level === X && currentStationY === Y) {
        flag = 'active';
      }

      if (level > X && currentStationY === Y) {
        const nextStationY = getStationY(X + 1 as TLevel);
        if (nextStationY === Follower) {
          flag = 'taken';
        }
      }

      const key = flag as keyof typeof widths;
      const width = widths[key];
      const color = colors[key];

      return (
        <line key={`Act${Act}_x${X}y${Y}_x${X2}y${Y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width}></line>
      );
    });
  });

  const width = (length + gap) * Nodes[Nodes.length - 1].X + gap;
  const height = gap * (Math.max(1, h));

  return (
    <svg className="p-map__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {/* TODO: additionalLines */}
    </svg>
  );
}

export default Svg;