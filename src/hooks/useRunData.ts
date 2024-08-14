import { getConfigs, getLog } from 'utils/functions/fetchData';
import { TRunData } from 'utils/types/runData';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRunData } from 'utils/functions/helpers';
import use from 'utils/functions/use';
import setHoldings from 'utils/functions/setHoldings';
import { logConfigs } from 'configs/globals';
import { TConfigsData } from 'utils/types/common';

function useRunData(id: string)  {
  const { version, configsData } = useContext(CommonContext);
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings, setIgnoredPaths, setConfigsData } = useContext(LogContext);

  const characterConfigs = configsData.characters;
  const exhibitConfigs = configsData.exhibits;

  const navigate = useNavigate();
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
      if (exhibitConfigs !== undefined && characterConfigs !== undefined) {
        const ignoredPaths = setHoldings(runData, characterConfigs, dispatchHoldings, exhibitConfigs);
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
  }, [isValidRunData, runData, exhibitConfigs, characterConfigs]);
}

export default useRunData;