import { getLog } from 'utils/fetchData';
import { TRunData } from 'utils/types';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validateRunData from 'utils/validateRunData';
import use from 'utils/use';

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsLoading, setRunData } = useContext(LogContext);
  // TODO: setLog

  const navigate = useNavigate();
  let isValidRunData = false;
  const runData = use(getLog(version, id)) as TRunData;
  isValidRunData = validateRunData(runData);

  useEffect(() => {
      setIsLoading(false);
      if (isValidRunData) setRunData(runData);
      else navigate('/', { replace: true });
  }, [navigate, isValidRunData, setIsLoading, runData, setRunData]);
}

export default useRunData;