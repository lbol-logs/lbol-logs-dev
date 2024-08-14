import { getConfigs, getLog } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateConfigs, validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { configs } from 'configs/globals';
import { TConfigsData, TObj } from 'utils/types/common';

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const navigate = useNavigate();
  let isValidRunData = false;
  const runData = use(getLog(version, id)) as TRunData;
  isValidRunData = validateRunData(runData);
  const playerConfigs = use(getConfigs(version, 'players'));
  const isValidPlayerConfigs = validateConfigs(playerConfigs);
  const isValidConfigs: TObj<boolean> = {};
  const currentConfigs: TConfigsData = {};
  for (const config of configs) {
    const configs = use(getConfigs(version, config));
    currentConfigs[config] = configs;
    isValidConfigs[config] = validateConfigs(configs);
  }

  useEffect(() => {
    setIsRunDataLoaded(false);
    if (isValidRunData) {
      setRunDataId(id);
      setRunData(runData);
      if (isValidPlayerConfigs) {
        const ignoredPaths = setHoldings(runData, playerConfigs, dispatchHoldings, currentConfigs.exhibits);
        setIgnoredPaths(ignoredPaths);
      }
      setConfigsData(currentConfigs);
      setIsRunDataLoaded(true);
    }
    else {
      setIsRunDataLoaded(true);
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidRunData, runData, playerConfigs, isValidPlayerConfigs]);
}

export default useRunData;