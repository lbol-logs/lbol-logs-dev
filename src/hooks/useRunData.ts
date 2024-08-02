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

  useEffect(() => {
    let isValidRunData = false;
    try {
      const runData: TRunData = use(getLog(version, id));
      isValidRunData = validateRunData(runData);
      setIsLoading(false);
      if (isValidRunData) setRunData(runData);
      else navigate("/", { replace: true });
    }
    catch(e) {
      setIsLoading(false);
      navigate("/", { replace: true });
    }
  }, [navigate, version, id, setIsLoading, setRunData]);
}

export default useRunData;