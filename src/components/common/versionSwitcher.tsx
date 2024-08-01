import { CommonContext } from "contexts/commonContext";
import { versions } from "configs/globals";
import { ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";

function VersionSwitcher() {
  const { version, setVersion } = useContext(CommonContext);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setVersion(v);

    navigate(`/${v}/`, { replace: true });
  }

  return (
    <div className="l-header__version"> 
      <select onChange={handleChange} value={version}>
        {versions.map(v => {
          return (
            <option key={v} value={v}>{v}</option>
          );
        })}
      </select>
    </div>
  );
}

export default VersionSwitcher;