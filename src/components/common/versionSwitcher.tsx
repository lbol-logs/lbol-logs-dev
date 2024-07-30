import { VersionContext } from "contexts/versionContext";
import { versions } from "configs/globals";
import { ChangeEvent, useContext } from "react";
import changeVersion from "components/utils/changeVersion";

function VersionSwitcher() {
  const { version, setVersion } = useContext(VersionContext);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setVersion(v);
    changeVersion(v);
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