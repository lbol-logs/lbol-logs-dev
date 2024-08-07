import { getConfig, getLog } from 'utils/fetchData';
import { TRunData } from 'utils/types/runData';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateConfigs, validateRunData } from 'utils/validate';
import use from 'utils/use';
import setHoldings from 'utils/setHoldings';

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { isRunDataLoaded, setIsRunDataLoaded, setRunData, dispatchHoldings } = useContext(LogContext);
  // TODO: setLog

  const navigate = useNavigate();
  let isValidRunData = false;
  const runData = use(getLog(version, id)) as TRunData;
  isValidRunData = validateRunData(runData);
  const playerConfigs = use(getConfig(version, 'players'));
  const isValidPlayConfigs = validateConfigs(playerConfigs);

  useEffect(() => {
    if (isValidRunData) {
      setRunData(runData);
      if (isValidPlayConfigs) {
        setHoldings(runData, playerConfigs, dispatchHoldings);
      }
      setIsRunDataLoaded(true);
    }
    else {
      setIsRunDataLoaded(true);
      navigate('/', { replace: true });
    }
  }, [navigate, isValidRunData, setIsRunDataLoaded, runData, setRunData, playerConfigs, isValidPlayConfigs, dispatchHoldings]);
}

export default useRunData;