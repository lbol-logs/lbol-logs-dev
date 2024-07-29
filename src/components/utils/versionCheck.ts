import { VersionContext } from "App";
import { versions } from "configs/globals";
import { useContext } from "react";
import { redirect } from "react-router-dom";

function VersionCheck(ver: string) {
  const { setVersion } = useContext(VersionContext);

  if (ver && !versions.includes(ver)) {
    return redirect("/");
  }

  setVersion(ver as string);
  return true;
}

export default VersionCheck;