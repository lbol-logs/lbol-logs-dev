import { LogContext } from 'contexts/logContext';
import useGap from 'hooks/useGap';
import { useContext } from 'react';
import { TStation } from 'utils/types/runData';
import GapDescription from './gapDescription';
import { TComponents } from 'utils/types/common';

function GapDescriptions({ station, option }: { station: TStation, option: string }) {
  const { runData, holdings } = useContext(LogContext);
  const { Node, Status: { MaxHp } } = station;

  const additionalDescRef = useGap({ option, runData, holdings, Node });
  const additionalDesc = additionalDescRef.current as TComponents;

  return (
    <div className="p-gap-choice__descs">
      <GapDescription option={option} maxhp={MaxHp} key={option} />
      {additionalDesc}
    </div>
  );
}

export default GapDescriptions;