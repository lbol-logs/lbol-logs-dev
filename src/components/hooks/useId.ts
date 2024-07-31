import { getLog } from "components/utils/getData";
import { TRunLog } from "components/utils/TRunLog";
import { LogContext } from "contexts/logContext";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useId(id: string)  {
  const { version } = useContext(VersionContext);
  const { setId } = useContext(LogContext);
  // TODO: setLog

  const isValidId = id;
  getLog(version, id)
    .then((log: TRunLog) => {
      console.log(log);
      setId(id);
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