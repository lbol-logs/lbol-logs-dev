import { getConfigs, getLog, getLog2 } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getConfigsKey, validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { configsData, defaultRunData, logConfigs } from 'configs/globals';
import { TObjAny } from 'utils/types/common';
import Configs from 'utils/classes/Configs';

function useRunData(args: TObjAny)  {
  const {
    version, id,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths
  } = args;

  const { charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs } = configsData;

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
  for (const name of logConfigs) {
    const configs = use(getConfigs(version, name));
    configsData[getConfigsKey(name)] = new Configs(configs);
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
      setIsRunDataLoaded(true);
    }
  }, [isValidRunData, runData, exhibitsConfigs, charactersConfigs, requestsConfigs, eventsConfigs]);

  let redirect = null;
  if (!isValidRunData) redirect = <Navigate to="/" replace />;

  return [isValidRunData, redirect];
}

export default useRunData;