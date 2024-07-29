import { VersionContext } from "App";
import { versions } from "configs/globals";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function VersionChecker({ ver }: { ver: string }) {
  console.log({ver, first: ver ? true : false, second: !versions.includes(ver), cond: ver && !versions.includes(ver) ? true : false});
  const { setVersion } = useContext(VersionContext);
  let result;
  if (!versions.includes(ver)) {
    result = (<Navigate to="/" replace={true} />);
  }
  else {
    result = (
      <p>バージョン: {ver}</p>
    );
  }

  setVersion(ver as string);
  return result;
}

export default VersionChecker;