import { versions } from "configs/globals";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckVersion(ver: string)  {
  const { setVersion } = useContext(VersionContext);
  const isValidVersion = versions.includes(ver);

  if (isValidVersion) {
    setVersion(ver);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidVersion) {
      navigate('/', { replace: true })
    }
  }, [isValidVersion]);
}

export default CheckVersion;