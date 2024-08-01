import { getLog } from "utils/getData";
import { TRunData } from "utils/types";
import { LogContext } from "contexts/logContext";
import { CommonContext } from "contexts/commonContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRunData(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsLoading, setRunData } = useContext(LogContext);
  // TODO: setLog

  let isValidRunData = false;
  setIsLoading(true);
  getLog(version, id)
    .then((runData: TRunData) => {
      console.log(runData);
      // TODO: validate
      isValidRunData = true;
      setRunData(runData);
      setIsLoading(true);
    })
    .catch(() => {
      navigate("/", { replace: true });
    });

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidRunData) {
      navigate("/", { replace: true });
    }
  }, [navigate, isValidRunData]);
}

export default useRunData;