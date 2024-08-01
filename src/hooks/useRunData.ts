import { getLog } from 'utils/getData';
import { TRunData } from 'utils/types';
import { LogContext } from 'contexts/logContext';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validateRunData from 'utils/validateRunData';

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsLoading, setRunData } = useContext(LogContext);
  // TODO: setLog

  const navigate = useNavigate();
  let isValidRunData = false;

  useEffect(() => {
    getLog(version, id)
      .then((runData: TRunData) => {
        // TODO: validate
        isValidRunData = validateRunData(runData);
        setIsLoading(false);
        if (isValidRunData) setRunData(runData);
        else navigate("/", { replace: true });
      })
      .catch(e => {
        setIsLoading(false);
        navigate("/", { replace: true });
      });
  }, [navigate, isValidRunData]);
}

export default useRunData;