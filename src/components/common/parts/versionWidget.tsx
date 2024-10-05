import { CONFIGS_DATA, latestVersion, MODS_CONFIGS_DATA, versions } from 'configs/globals';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TDispatch } from 'utils/types/common';

function VersionWidget({ version, setVersion, versionSwitch, className }: { version: string, setVersion: TDispatch<string>, versionSwitch: boolean, className: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isLatestVersion = version === latestVersion;

  let ver;

  if (versionSwitch) {
    ver = (
      <select className="c-version__select" onChange={handleChange} value={version}>
        {versions.map(v => {
          return <option className="c-version__option" key={v} value={v}>{v}</option>;
        })}
      </select>
    );
  }
  else {
    ver = (
      <span className={`c-version__text ${isLatestVersion ? 'c-version__text--latest' : ''}`}>{version}</span>
    );
  }

  let latest = null;
  if (isLatestVersion) {
    latest = <span className="c-version__latest">{t('latest', { ns: 'common' })}</span>;
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    CONFIGS_DATA.version = v;
    MODS_CONFIGS_DATA.version = v;
    setVersion(v);

    navigate(`/${v}/`, { replace: true });
  }

  return (
    <div className={className}>
      {latest}
      {ver}
    </div>
  );
}

export default VersionWidget;