import { getConfigs, getLog, getLog2 } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { configsData, defaultRunData, logConfigs } from 'configs/globals';
import { TConfigsData, TObjAny } from 'utils/types/common';

function useRunData(args: TObjAny)  {
  const {
    version, id,
    eventsConfigs,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData
  } = args;

  const { charactersConfigs, exhibitsConfigs, requestsConfigs } = configsData;

  function getRunData(): [TRunData, boolean] {
    let runData = defaultRunData;
    let isValidRunData = false;

    if (id) {
      runData = use(getLog(version, id)) as TRunData;
      isValidRunData = validateRunData(runData);

      if (!isValidRunData) {
        runData = use(getLog2(version, id)) as TRunData;
        isValidRunData = validateRunData(runData);
      }
    }

    return [runData, isValidRunData];
  }

  const [runData, isValidRunData] = getRunData();
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
      const array: Array<TObjAny | undefined> = [exhibitsConfigs, charactersConfigs, requestsConfigs, eventsConfigs];
      if (!array.includes(undefined)) {
        const ignoredPaths = setHoldings({ runData, dispatchHoldings, charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs });
        setIgnoredPaths(ignoredPaths);
      }
      setConfigsData(currentConfigs);
      setIsRunDataLoaded(true);
    }
  }, [isValidRunData, runData, exhibitsConfigs, charactersConfigs, requestsConfigs, eventsConfigs]);

  let redirect = null;
  if (!isValidRunData) redirect = <Navigate to="/" replace />;

  return [isValidRunData, redirect];
}

export default useRunData;