import { getLog } from 'utils/getData';
import { TRunData } from 'utils/types';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsLoading, setRunData } = useContext(LogContext);
  // TODO: setLog

  const navigate = useNavigate();
  let isValidRunData = false;
  (async() => {
    try {
      const runData: TRunData = await getLog(version, id);
      // TODO: validate
      isValidRunData = true;
      console.log(new Date().toLocaleTimeString(), 'awaited', runData);
      setRunData(runData);
      setIsLoading(false);
    }
    catch(e) {
      setIsLoading(false);
      navigate("/", { replace: true });
    }
  })();

  useEffect(() => {
    if (!isValidRunData) {
      navigate("/", { replace: true });
    }
  }, [navigate, isValidRunData]);
}

export default useRunData;