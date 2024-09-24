import { CommonContext } from 'contexts/commonContext';
import { LogContext } from 'contexts/logContext';
import useHoldings from 'hooks/useHoldings';
import { useContext } from 'react';
import { THolding } from 'utils/types/runData';

function CurrentHoldings() {
  const { holdingsHeight, setHoldingsHeight } = useContext(CommonContext);
  const { act, level, holdings } = useContext(LogContext);
  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;

  const {
    holdingsRef,
    holding,
    startResizing,
    stopResizing
  } = useHoldings({ level, currentHolding, setHoldingsHeight });

  return (
    <div
      className="p-holdings p-holdings--horizontal js-holdings"
      ref={holdingsRef}
      style={{ height: holdingsHeight }}
    >
      <div className="p-holdings__inner">
        {holding}
      </div>
      <div
        className="p-holdings__resizer p-holdings__resizer--horizontal js-resizer"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        onTouchEnd={stopResizing}
        onTouchCancel={stopResizing}
      />
    </div>
  );
}

export default CurrentHoldings;