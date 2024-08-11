import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useState } from 'react';
import { checkForce } from 'utils/checkForce';
import MapNodes from 'utils/MapNodes';
import { ExhibitWithCounter, TActObj, TLevel, TNode, TNodeObj, TNodeY } from 'utils/types/runData';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { runData, act, level, ignoredPaths } = useContext(LogContext);
  const { Act, Nodes } = ActObj;
  const [additionalLines, setAdditionalLines] = useState<JSX.Element>(null as unknown as JSX.Element);

  const { length, gap, colors, widths, size, dash } = MapNodes.mapOptions;

  const { nodesY, force } = checkForce(Nodes);
  const h = force ? nodesY.filter(Y => Y).length : 1;

  const currentActStations = runData.Stations.map(({ Node }) => Node).filter(({ Act: _act }) => _act === Act);
  function getStationY(level: TLevel) {
    const station = currentActStations.find(({ Level }) => Level === level) as TNodeObj;
    const Y = station && station.Y;
    return Y;
  }

  let lastLevel: TLevel;
  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;
    const currentStationY = getStationY(X);
    const nextStationY = getStationY(X + 1 as TLevel);
    lastLevel = X;

    return Followers.map(Follower => {
      const X2 = X + 1;
      const Y2 = Follower as TNodeY;
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2, force);

      let flag = 'normal';

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

  function getNodes(level: TLevel, y?: TNodeY) {
    const nodes = Nodes.filter(({ X, Y }) => X === level && (!y || Y === y));
    return nodes;
  }

  // TiangouYuyi
  useEffect(() => {
    console.log(ignoredPaths);
    const length = ignoredPaths.length;
    if (!length) return;

    const add = ignoredPaths[0];
    if (add.Station.Act > Act) return;
    const remove = ignoredPaths.find(({ Type }) => Type === 'Remove');
    if (remove && remove.Station.Act < Act) return;

    let linesActive = [];

    const startLevel = add.Station.Act === Act ? add.Station.Level + 1 : 0;
    const endLevel = (remove && remove.Station.Act === Act) ? remove.Station.Level : lastLevel;
    console.log({act, remove, startLevel, endLevel});
    for (let l = startLevel; l < endLevel; l++) {
      console.log({l, level});
      if (l < level) continue;
      else if (l > level) break;
      
      const X = l as TLevel;
      const Y = getStationY(X);
      const currentNode = getNodes(X, Y)[0];
      const nextNodes = getNodes(X + 1 as TLevel);
      if (nextNodes.length === 0) break;

      const { Followers } = currentNode;
      console.log(currentNode, nextNodes, { Y });
      for (const { Y: y } of nextNodes) {
        if (Followers.includes(y)) continue;
        const X2 = X + 1;
        const Y2 = y;
        const [x1, x2] = MapNodes.x1x2(X);
        const [y1, y2] = MapNodes.y1y2(Y, Y2, force);
        const flag = 'active';
        const key = flag as keyof typeof widths;
        const width = widths[key];
        const color = colors[key];
        const line = (
          <line key={`Act${Act}_x${X}y${Y}_x${X2}y${Y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash}></line>
        );
        linesActive.push(line);
      }
    }

    const uses = ignoredPaths.filter(({ Type }) => Type === 'Use');
    console.log({uses});


    const test = Object.entries({}).map(([Level, Counter]) => {
      return (
        // TODO: 羽根
        // TODO: dotted line
        // taken & active
        null
      );
    }) as unknown as JSX.Element;

    const additionalLines = (
      <>
        {linesActive}
      </>
    );
    setAdditionalLines(additionalLines);
  }, [ignoredPaths, act, level]);

  const width = (length + gap.x) * Nodes[Nodes.length - 1].X + gap.x + size;
  const height = gap.y * h + (force ? 0 : size * 1.5);

  return (
    <svg className="p-map__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {additionalLines}
    </svg>
  );
}

export default Svg;