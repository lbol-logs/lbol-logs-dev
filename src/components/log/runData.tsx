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
  const { holdingsWidth, setHoldingsWidth, asideHoldings, setAsideHoldings, configsData } = useContext(CommonContext);
  const { act, level, holdings, configsData: { events: eventsConfigs } } = useContext(LogContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const args = {
    version: ver, id,
    configsData,
    eventsConfigs,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData
  };
  const [isValidRunData, redirect] = useRunData(args);

  const aside = asideHoldings.toString();
  const isAside = aside !== '';
  const isSummary = act === 0;
  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  const {
    holdingsRef,
    holding,
    startResizing,
    stopResizing  
  } = useHoldings({ level, currentHolding, setHoldingsWidth, isAside });

  useEffect(() => {
    if (!isValidRunData) return;
    if (asideHoldings === AsideType.null) {
      const width = window.screen.width;
      setAsideHoldings(width >= asideHoldingsthreshold ? defaultAsideHoldings : AsideType.none);
    }
  }, []);

  const n = (holdingsWidth < 641 ? { '--exhibits-n': 1 } : {}) as React.CSSProperties;

  if (!isValidRunData) return redirect as unknown as JSX.Element;

  return (
    <main className={`l-log ${isAside ? `l-log--aside l-log--${aside}` : ''}`}>
      <div className={`l-log__inner ${isAside ? 'l-log__inner--aside': ''} l-inner`}>
        <Suspense fallback={<Loading />}>
          <RunDataTemplate />
        </Suspense>
      </div>
      {(isAside && !isSummary) && (
        <div
          className={`p-holdings p-holdings--vertical p-holdings--${aside}  js-holdings`}
          ref={holdingsRef}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={(e) => e.preventDefault()}
          onTouchCancel={(e) => e.preventDefault()}
          style={{ width: holdingsWidth }}
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