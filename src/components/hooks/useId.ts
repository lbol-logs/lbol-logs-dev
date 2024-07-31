import { LogContext } from "contexts/logContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useId(_id: string)  {
  const { setId } = useContext(LogContext);

  const isValidId = _id;
  console.log(_id);
  if (isValidId) setId(_id);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidId) {
      // navigate("/", { replace: true })
    }
  }, [navigate, isValidId]);
}

export default useId;