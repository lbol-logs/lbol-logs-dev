import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import RunListInner from './runListInner';

function RunList() {
  const { version } = useContext(CommonContext);
  if (!version) return null;
  return (
    <RunListInner />
  );
}

export default RunList;