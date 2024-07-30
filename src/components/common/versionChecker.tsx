import { VersionContext } from "App";
import { versions } from "configs/globals";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function VersionChecker({ ver }: { ver: string }) {
  const { setVersion } = useContext(VersionContext);
  const isValidVersion = versions.includes(ver);

  isValidVersion && setVersion(ver as string);

  return (
    <>
      {isValidVersion
        ? <p>バージョン: {ver}</p>
        : <Navigate to="/" replace={true} />
      }
    </>
  );
}

export default VersionChecker;