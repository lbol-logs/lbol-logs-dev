import { getLog } from "utils/getData";
import { TRunData } from "utils/types";
import { LogContext } from "contexts/logContext";
import { CommonContext } from "contexts/commonContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useId(id: string)  {
  const { version } = useContext(CommonContext);
  const { setIsLoading, setRunData } = useContext(LogContext);
  // TODO: setLog

  let isValidId = false;
  setIsLoading(true);
  getLog(version, id)
    .then((runData: TRunData) => {
      console.log(runData);
      // TODO: validate
      setRunData(runData);
      setIsLoading(true);
    })
    .catch(() => {
      navigate("/", { replace: true });
    });

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidId) {
      navigate("/", { replace: true });
    }
  }, [navigate, isValidId]);
}

export default useId;