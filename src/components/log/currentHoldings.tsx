import { LogContext } from 'contexts/logContext';
import useHoldings from 'hooks/useHoldings';
import { useContext } from 'react';
import { THolding } from 'utils/types/runData';

function CurrentHoldings() {
  const { act, level, holdings } = useContext(LogContext);
  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;

  const {
    holdingsRef,
    holdingsHeight,
    holding,
    startResizing,
    stopResizing
  } = useHoldings({ level, currentHolding });

  return (
    <div
      className="p-holdings js-holdings"
      ref={holdingsRef}
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
      onTouchEnd={(e) => e.preventDefault()}
      onTouchCancel={(e) => e.preventDefault()}
      style={{ height: holdingsHeight }}
    >
      <div className="p-holdings__inner">
        {holding}
      </div>
      <div
        className="p-holdings__resizer js-resizer"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        onTouchEnd={stopResizing}
        onTouchCancel={stopResizing}
      />
    </div>
  );
}

export default CurrentHoldings;