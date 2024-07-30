import { versions } from "configs/globals";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckVersion(ver: string)  {
  const { version, setVersion } = useContext(VersionContext);

  const isChanged = ver !== version;
  const isValidVersion = versions.includes(ver);

  if (isChanged && isValidVersion) {
    setVersion(ver);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidVersion) {
      navigate("/", { replace: true })
    }
  }, [navigate, isValidVersion]);
}

export default CheckVersion;