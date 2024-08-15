import { CommonContext } from 'contexts/commonContext';
import { latestVersion, versions } from 'configs/globals';
import { ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function VersionWidget({ versionSwitch }: { versionSwitch: boolean }) {
  const { version, setVersion } = useContext(CommonContext);
  const navigate = useNavigate();
  const isLatestVersion = version === latestVersion;

  let ver;
  if (versionSwitch) {
    ver = (
      <span className={`c-version__text ${isLatestVersion ? 'c-version__text--latest' : ''}`}>{version}</span>
    );
  }
  else {
    ver = (
      <select className="c-version__select" onChange={handleChange} value={version}>
        {versions.map(v => {
          return <option className="c-version__option" key={v} value={v}>{v}</option>;
        })}
      </select>
    );
  }
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    setVersion(v);

    navigate(`/${v}/`, { replace: true });
  }

  return (
    <div className="l-header__version">
      {ver}
    </div>
  );
}

export default VersionWidget;