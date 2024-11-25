import VersionWidget from 'components/common/parts/versionWidget';
import ModsWidget from 'components/log/parts/modsWidget';
import { latestVersion, MODS_CONFIGS_DATA, modsConfigsData } from 'configs/globals';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

function AboutMods() {
  const [version, setVersion] = useState(latestVersion);
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  useMemo(() => {
    setLoaded(false);
    (async() => {
      // TODO
        await MODS_CONFIGS_DATA.fetchAsync(version, ['mods']);
        setLoaded(true);
    })();
  }, [version]);

  let mods : Array<any> = [];
  const { modsConfigs } = modsConfigsData;
  if (loaded) {
    const { ids } = modsConfigs;
    mods = ids.map(id => modsConfigs.get(id));
  }

  return (
    <div className="p-about-lbol-logs__block">
      <h2 className="p-about-lbol-logs__mods">
        <span className="p-mods__text">{t('lbolLogs.fullSupport', { ns: 'site' })}</span>
        <VersionWidget className="p-mods__version" version={version} setVersion={setVersion} versionSwitch={true} redirect={false} />
      </h2>
      <p>{t('lbolLogs.fullSupportRemark', { ns: 'site' })}</p>
      <ModsWidget mods={mods} version={version} />
    </div>
  );
}

export default AboutMods;