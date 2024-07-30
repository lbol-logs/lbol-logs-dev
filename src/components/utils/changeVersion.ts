import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function changeVersion(ver: string) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/${ver}/`, { replace: true });
  }, [ver]);
}

export default changeVersion;