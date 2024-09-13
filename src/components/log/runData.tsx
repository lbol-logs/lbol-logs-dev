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
  const { setHoldingsHeight, asideHoldings, setAsideHoldings, configsData } = useContext(CommonContext);
  const { act, level, holdings, configsData: { events: eventsConfigs } } = useContext(LogContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const args = {
    version: ver, id,
    configsData,
    eventsConfigs,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData
  };
  const [isValidRunData, redirect] = useRunData(args);

  const isAside = asideHoldings.toString() !== '';
  const isSummary = act === 0;
  const currentHolding = holdings.find(({ Act, Level }) => Act === act && Level === level) as THolding;
  const { holding } = useHoldings({ level, currentHolding, setHoldingsHeight, isAside });

  useEffect(() => {
    if (!isValidRunData) return;
    if (asideHoldings === AsideType.null) {
      const width = window.screen.width;
      setAsideHoldings(width >= asideHoldingsthreshold ? defaultAsideHoldings : AsideType.none);
    }
  }, []);

  if (!isValidRunData) return redirect as unknown as JSX.Element;

  return (
    <main className={`l-log ${isAside ? `l-log--aside l-log--${asideHoldings.toString()}` : ''}`}>
      <div className={`l-log__inner ${isAside ? 'l-log__inner--aside': ''} l-inner`}>
        <Suspense fallback={<Loading />}>
          <RunDataTemplate />
        </Suspense>
      </div>
      {isAside && (
        <aside className="p-holdings--aside">
          {!isSummary && holding}
        </aside>
      )}
    </main>
  );
}

export default RunData;