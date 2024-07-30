import { VersionContext } from "contexts/versionContext";
import { versions } from "configs/globals";
import { ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VersionSwitcher() {
  const { version, setVersion } = useContext(VersionContext);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setVersion(v);

    navigate(`/${v}/`, { replace: true });
  }

  return (
    <> 
      <select onChange={handleChange} value={version}>
        {versions.map(v => {
          return (
            <option key={v} value={v}>{v}</option>
          );
        })}
      </select>
      <p>バージョン: {version}</p>
    </>
  );
}

export default VersionSwitcher;