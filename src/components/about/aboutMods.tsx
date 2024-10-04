import VersionWidget from "components/common/parts/versionWidget";
import ModsWidget from "components/log/parts/modsWidget";
import { latestVersion, modsConfigsData } from "configs/globals";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AboutMods() {
  const [version, setVersion] = useState(latestVersion);
  const { t } = useTranslation();

  const { modsConfigs } = modsConfigsData;
  const { ids } = modsConfigs;
  const mods = ids.map(id => modsConfigs.get(id));

  return (
    <div className="p-about-lbol-logs__block">
      <h2 className="p-about-lbol-logs__supported-character-mods">
        {t('lbolLogs.supportedCharacterMods', { ns: 'site' })}
        <VersionWidget className="p-mods__version" version={version} setVersion={setVersion} versionSwitch={true} />
      </h2>
      <ModsWidget mods={mods} />
    </div>
  );
}

export default AboutMods;