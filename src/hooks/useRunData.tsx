import { getConfigs, getLog } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { logConfigs } from 'configs/globals';
import { TConfigsData } from 'utils/types/common';

function useRunData(id: string)  {
  const { version, configsData } = useContext(CommonContext);
  const { configsData: { events: eventsConfigs } } = useContext(LogContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const {
    characters: characterConfigs,
    exhibits: exhibitConfigs,
    requests: requestConfigs
  } = configsData;

  let isValidRunData = false;
  const runData = use(getLog(version, id)) as TRunData;
  isValidRunData = validateRunData(runData);
  const currentConfigs: TConfigsData = {};
  for (const config of logConfigs) {
    const configs = use(getConfigs(version, config));
    currentConfigs[config] = configs;
  }

  useEffect(() => {
    setIsRunDataLoaded(false);
    if (isValidRunData) {
      setRunDataId(id);
      setRunData(runData);
      if (exhibitConfigs !== undefined && characterConfigs !== undefined && requestConfigs !== undefined) {
        const ignoredPaths = setHoldings({ runData, dispatchHoldings, characterConfigs, exhibitConfigs, requestConfigs, eventsConfigs });
        setIgnoredPaths(ignoredPaths);
      }
      setConfigsData(currentConfigs);
      setIsRunDataLoaded(true);
    }
  }, [isValidRunData, runData, exhibitConfigs, characterConfigs, requestConfigs, eventsConfigs]);

  let redirect = null;
  if (!isValidRunData) redirect = <Navigate to="/" replace />;

  return [isValidRunData, redirect];
}

export default useRunData;