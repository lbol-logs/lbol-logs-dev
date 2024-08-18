import { useEffect, useState } from 'react';
import { checkForce } from 'utils/functions/helpers';
import MapNodes from 'utils/classes/MapNodes';
import { TAct, THoldingChange, TLevel, TNodeObj, TNodes, TNodeX, TNodeY, TRunData } from 'utils/types/runData';

function useSvg({ runData, act, level, ignoredPaths, Act, Nodes }: { runData: TRunData, act: TAct, level: TLevel, ignoredPaths: Array<THoldingChange>, Act: TAct, Nodes: TNodes }) {
  const [additionalLines, setAdditionalLines] = useState<JSX.Element>(null as unknown as JSX.Element);

  const { length, gap, colors, widths, size, dash } = MapNodes.mapOptions;

  const { nodesY, force } = checkForce(Nodes);
  const h = force ? nodesY.filter(Y => Y).length : 1;

  const currentActStations = runData.Stations.map(({ Node }) => Node).filter(({ Act: _act }) => _act === Act);
  function getStationY(level: TNodeX) {
    const station = currentActStations.find(({ Level }) => Level === level) as TNodeObj;
    const Y = station && station.Y;
    return Y;
  }

  function getNodes(level: TNodeX, y?: TNodeY) {
    const nodes = Nodes.filter(({ X, Y }) => X === level && (!y || Y === y));
    return nodes;
  }

  type TLineArgs = {
    X: TNodeX,
    Y: TNodeY,
    X2: TNodeX,
    Y2: TNodeY,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    width: number,
    dash?: number
  };

  function getLine({ X, Y, X2, Y2, x1, y1, x2, y2, color, width, dash = 0 }: TLineArgs) {
    return (
      <line key={`Act${Act}_x${X}y${Y}_x${X2}y${Y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeDasharray={dash}></line>
    );
  }

  let lastLevel: TNodeX;
  const lines = Nodes.map(node => {
    const { X, Y, Followers } = node;
    const X2 = X + 1 as TNodeX;
    const currentStationY = getStationY(X);
    const nextStationY = getStationY(X2);
    lastLevel = X;

    return Followers.map(Follower => {
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

      return getLine({ X, Y, X2, Y2, x1, y1, x2, y2, color, width });
    });
  });

  // TiangouYuyi
  useEffect(() => {
    const length = ignoredPaths.length;
    if (!length) return;

    const add = ignoredPaths[0];
    if (add.Station.Act > Act) return;
    const remove = ignoredPaths.find(({ Type }) => Type === 'Remove');
    if (remove && remove.Station.Act < Act) return;

    let linesActive = [];
    let linesTaken = [];

    const startLevel = add.Station.Act === Act ? add.Station.Level + 1 : 0;
    const endLevel = (remove && remove.Station.Act === Act) ? remove.Station.Level : lastLevel;
    for (let l = startLevel; l < endLevel; l++) {
      if (l < level) continue;
      else if (l > level) break;

      const X = l as TNodeX;
      const Y = getStationY(X);
      const X2 = X + 1 as TNodeX;
      const currentNode = getNodes(X, Y)[0];
      const nextNodes = getNodes(X2);
      if (nextNodes.length === 0) break;

      const { Followers } = currentNode;
      for (const { Y: y } of nextNodes) {
        if (Followers.includes(y)) continue;

        const Y2 = y;
        const [x1, x2] = MapNodes.x1x2(X);
        const [y1, y2] = MapNodes.y1y2(Y, Y2, force);
        const flag = 'active';
        const key = flag as keyof typeof widths;
        const width = widths[key];
        const color = colors[key];
        const line = getLine({ X, Y, X2, Y2, x1, y1, x2, y2, color, width, dash });
        linesActive.push(line);
      }
    }

    const uses = ignoredPaths.filter(({ Type }) => Type === 'Use');
    for (const use of uses) {
      const { Act, Level, Y } = use.Station;
      if (Act !== act) continue;
      if (Level >= level) continue;

      const X = Level;
      const X2 = X + 1 as TNodeX;
      const Y2 = getStationY(X2);
      const [x1, x2] = MapNodes.x1x2(X);
      const [y1, y2] = MapNodes.y1y2(Y, Y2, force);
      const flag = 'taken';
      const key = flag as keyof typeof widths;
      const width = widths[key];
      const color = colors['taken2'];
      const line = getLine({ X, Y, X2, Y2, x1, y1, x2, y2, color, width, dash });
      linesTaken.push(line);
    }

    const additionalLines = (
      <>
        {linesActive}
        {linesTaken}
      </>
    );
    setAdditionalLines(additionalLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ignoredPaths, act, level]);

  const width = (length + gap.x) * Nodes[Nodes.length - 1].X + gap.x + size;
  const height = gap.y * h + (force ? 0 : size * 1.5);

  return {
    width,
    height,
    lines,
    additionalLines
  };
}

export default useSvg;