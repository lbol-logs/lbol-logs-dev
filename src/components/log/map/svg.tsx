import { LogContext } from 'contexts/logContext';
import useSvg from 'hooks/useSvg';
import { useContext } from 'react';
import { TActObj } from 'utils/types/runData';

function Svg({ ActObj }: { ActObj: TActObj }) {
  const { runData, act, level, ignoredPaths } = useContext(LogContext);
  const { Act, Nodes } = ActObj;

  const {
    width,
    height,
    lines,
    additionalLines
  } = useSvg({ runData, act, level, ignoredPaths, Act, Nodes });

  return (
    <svg className="p-map__svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {lines}
      {additionalLines}
    </svg>
  );
}

export default Svg;