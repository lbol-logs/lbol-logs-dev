import { Suspense } from 'react';
import useRunData from 'hooks/useRunData';
import RunDataTemplate from './runDataTemplate';
import Loading from 'components/common/layouts/loading';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';

function RunData({ ver, id }: { ver: string, id: string }) {
  const { configsData } = useContext(CommonContext);
  const { configsData: { events: eventsConfigs } } = useContext(LogContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const args = {
    version: ver, id,
    configsData,
    eventsConfigs,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData
  };
  const [isValidRunData, redirect] = useRunData(args);
  if (!isValidRunData) return redirect as unknown as JSX.Element;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RunDataTemplate />
      </Suspense>
    </>
  );
}

export default RunData;