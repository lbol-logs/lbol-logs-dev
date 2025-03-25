import { CONFIGS_DATA, latestVersion, MODS_CONFIGS_DATA, versions } from 'configs/globals';
import { useEffect, useMemo, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';

function useInit({ configs, modsConfigs, version, setVersion, navigate, ver, tempRedirectVersion }: { configs: Array<string>, modsConfigs: Array<string>, version: string, setVersion: TDispatch<string>, navigate: NavigateFunction, ver?: string, tempRedirectVersion?: string }) {
  const _ver = tempRedirectVersion || (ver || version) || latestVersion;
  const [prevVersion, setPrevVersion] = useState('');

  const isValidVersion = versions.includes(_ver) || _ver === 'temp';
  const isVersionChanged = prevVersion !== _ver;

  const redirect = useMemo(() => {
    let redirect;
    if (!isValidVersion) {
      redirect = () => navigate('/', { replace: true });
    }
    else if (isVersionChanged) {
      CONFIGS_DATA.version = _ver;
      MODS_CONFIGS_DATA.version = _ver;
      CONFIGS_DATA.fetch(_ver, configs);
      MODS_CONFIGS_DATA.fetch(_ver, modsConfigs);
    }
    return redirect;
  }, [_ver, isValidVersion, isVersionChanged]);

  useEffect(() => {
    if (!version || tempRedirectVersion) setVersion(_ver);
    if (isVersionChanged) setPrevVersion(_ver);
  }, [version, tempRedirectVersion]);

  useEffect(() => {
    if (redirect) redirect();
  }, [redirect]);
}

export default useInit;