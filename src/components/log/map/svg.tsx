import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { ExhibitWithCounter, TActObj, TLevel, TNodeObj, TNodeY } from 'utils/types/runData';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { runData, level, holdings } = useContext(LogContext);
  const { Act, Nodes } = ActObj;

  const { length, gap, colors, widths, size } = MapNodes.mapOptions;

  const { nodesY, force } = checkForce(Nodes);
  const h = force ? nodesY.filter(Y => Y).length : 1;

  const currentActStations = runData.Stations.map(({ Node }) => Node).filter(({ Act: _act }) => _act === Act);
  function getStationY(level: TLevel) {
    const station = currentActStations.find(({ Level }) => Level === level) as TNodeObj;
    const Y = station && station.Y;
    return Y;
  }

  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;
    const currentStationY = getStationY(X);
    const nextStationY = getStationY(X + 1 as TLevel);

    return Followers.map(Follower => {
      const X2 = X + 1;
      const Y2 = Follower as TNodeY;
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2, force);

      let flag = 'normal';

      // TODO: 羽根
      if (level === X && currentStationY === Y) {
        flag = 'active';
      }

      if (level > X && currentStationY === Y) {
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

  const currentActHoldings = holdings.filter(({ Act: _act }) => _act === Act);
  const ignores = [];
  for (const holding of currentActHoldings) {
    const { Level, Exhibits } = holding;
    const exhibit = Exhibits.find(({ Id }) => Id === ExhibitWithCounter.ChuRenou.toString());
    if (exhibit) {
      const { Counter } = exhibit;
      const ignore = { [Level]: Counter };
      ignores.push(ignore);
    }
  }
  const additionalLines = Object.entries(ignores).map(([Level, Counter]) => {
    return (
      // TODO: dotted line
      // taken & active
      null
    );
  });

  // TODO: boss width
  const width = (length + gap) * Nodes[Nodes.length - 1].X + gap + size;
  const height = gap * h + (force ? size : 0);

  return (
    <svg className="p-map__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {additionalLines}
    </svg>
  );
}

export default Svg;