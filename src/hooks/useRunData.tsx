import { getLog, getLog2 } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { configsData, defaultRunData, versions } from 'configs/globals';
import { TObjAny } from 'utils/types/common';
import Configs from 'utils/classes/Configs';

function useRunData(args: TObjAny) {
  const {
    version, id,
    setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths,
    search, setTempRedirectVersion
  } = args;

  const { charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs } = configsData;
  const array: Array<Configs | undefined> = [exhibitsConfigs, charactersConfigs, requestsConfigs, eventsConfigs];
  const isConfigsLoaded = !array.includes(undefined);

  let redirect: JSX.Element | null = null;
  let v: string;

  function getRunData(): [TRunData, boolean] {
    let runData = defaultRunData;
    let isValidRunData = false;

    if (id) {
      runData = use(getLog(version, id)) as TRunData;
      isValidRunData = validateRunData(runData);

      if (!isValidRunData && version === 'temp') {
        v = versions[1];
        runData = use(getLog(v, id)) as TRunData;
        isValidRunData = validateRunData(runData);

        if (isValidRunData) redirect = <Navigate to={`/${v}/${id}/${search}`} replace />;
      }

      if (!isValidRunData) {
        runData = use(getLog2(version, id)) as TRunData;
        isValidRunData = validateRunData(runData);
      }

      if (redirect && isValidRunData) isValidRunData = false;
    }

    return [runData, isValidRunData];
  }

  let [runData, isValidRunData] = getRunData();

  useEffect(() => {
    setIsRunDataLoaded(false);
    if (redirect && v) setTempRedirectVersion(v);
    if (!isConfigsLoaded) return;
    if (!isValidRunData) return;

    setRunDataId(id);
    setRunData(runData);
    const ignoredPaths = setHoldings({ runData, dispatchHoldings, charactersConfigs, exhibitsConfigs, requestsConfigs, eventsConfigs });
    setIgnoredPaths(ignoredPaths);
    setIsRunDataLoaded(true);
  }, [isValidRunData, runData, isConfigsLoaded, redirect]);

  if (!isValidRunData && !redirect) redirect = <Navigate to="/" replace />;

  return [isValidRunData, redirect];
}

export default useRunData;