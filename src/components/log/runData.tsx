import { Suspense } from 'react';
import { asideHoldingsthreshold, defaultAsideHoldings } from 'configs/globals';
import useRunData from 'hooks/useRunData';
import RunDataTemplate from './runDataTemplate';
import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { AsideType } from 'utils/types/common';
import useHoldings from 'hooks/useHoldings';
import { THolding } from 'utils/types/runData';

function RunData({ ver, id }: { ver: string, id: string }) {
  const { holdingsWidth, setHoldingsWidth, asideHoldings, setAsideHoldings } = useContext(CommonContext);
  const { act, level, holdings } = useContext(LogContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths } = useContext(LogContext);

  const args = {
    version: ver, id,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths
  };
  const [isValidRunData, redirect] = useRunData(args);

  const aside = asideHoldings;
  const isAside = aside !== '';
  const isSummary = act === 0;
  const showAside = isAside && !isSummary;

  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  const o = useHoldings({ level, currentHolding, setHoldingsWidth, isHidden: !showAside });
  const {
    holdingsRef,
    holding,
    startResizing,
    stopResizing
  } = o;

  useEffect(() => {
    if (!isValidRunData) return;
    if (asideHoldings === AsideType.null) {
      const width = window.screen.width;
      setAsideHoldings(width >= asideHoldingsthreshold ? defaultAsideHoldings : AsideType.none);
    }
  }, []);

  const style = (showAside ? { '--holdings-width': Math.min(Math.max(487, holdingsWidth), 801) + 'px' } : {}) as React.CSSProperties;
  const n = (holdingsWidth < 641 ? { '--exhibits-n': 1 } : {}) as React.CSSProperties;

  if (!isValidRunData) return redirect as unknown as JSX.Element;

  return (
    <main className={`l-log ${showAside ? `l-log--aside l-log--${aside}` : ''}`} style={style}>
      <div className={`l-log__inner ${showAside ? 'l-log__inner--aside': ''} l-inner`}>
        <Suspense fallback={<Loading />}>
          <RunDataTemplate />
        </Suspense>
      </div>
      {showAside && (
        <div
          className={`p-holdings p-holdings--vertical p-holdings--${aside}  js-holdings`}
          ref={holdingsRef}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={(e) => e.preventDefault()}
          onTouchCancel={(e) => e.preventDefault()}
        >
          <div className="p-holdings__inner" style={n}>
            {holding}
          </div>
          <div
            className="p-holdings__resizer p-holdings__resizer--vertical js-resizer"
            onMouseDown={startResizing}
            onTouchStart={startResizing}
            onTouchEnd={stopResizing}
            onTouchCancel={stopResizing}
          />
        </div>
      )}
    </main>
  );
}

export default RunData;