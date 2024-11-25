import { getLog, getLog2 } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { CONFIGS_DATA, configsData, defaultRunData, logConfigs, MODS_CONFIGS_DATA, modsLogConfigs } from 'configs/globals';
import { TObjAny } from 'utils/types/common';
import Configs from 'utils/classes/Configs';

function useRunData(args: TObjAny)  {
  const {
    version, id,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths
  } = args;

  const { charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs } = configsData;
  const array: Array<Configs | undefined> = [exhibitsConfigs, charactersConfigs, requestsConfigs, eventsConfigs];
  const isConfigsLoaded = !array.includes(undefined);

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
// TODO
  const [runData, isValidRunData] = getRunData();
  CONFIGS_DATA.fetch(version, logConfigs);
  MODS_CONFIGS_DATA.fetch(version, modsLogConfigs);

  useEffect(() => {
    setIsRunDataLoaded(false);
    if (!isConfigsLoaded) return;
    if (!isValidRunData) return;

    setRunDataId(id);
    setRunData(runData);
    const ignoredPaths = setHoldings({ runData, dispatchHoldings, charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs });
    setIgnoredPaths(ignoredPaths);
    setIsRunDataLoaded(true);
  }, [isValidRunData, runData, isConfigsLoaded]);

  let redirect = null;
  if (!isValidRunData) redirect = <Navigate to="/" replace />;

  return [isValidRunData, redirect];
}

export default useRunData;