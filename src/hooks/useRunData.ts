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
  const { setIsRunDataLoaded, setRunDataId, setRunData, dispatchHoldings } = useContext(LogContext);
  // TODO: setLog

  const navigate = useNavigate();
  let isValidRunData = false;
  const runData = use(getLog(version, id)) as TRunData;
  isValidRunData = validateRunData(runData);
  const playerConfigs = use(getConfig(version, 'players'));
  const isValidPlayConfigs = validateConfigs(playerConfigs);

  useEffect(() => {
    setIsRunDataLoaded(false);
    if (isValidRunData) {
      setRunDataId(id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidRunData, runData, playerConfigs, isValidPlayConfigs]);
}

export default useRunData;