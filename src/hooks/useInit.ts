import { CONFIGS_DATA, latestVersion, MODS_CONFIGS_DATA, versions } from 'configs/globals';
import { useEffect, useMemo, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';

function useInit({ configs, modsConfigs, version, setVersion, navigate, ver }: { configs: Array<string>, modsConfigs: Array<string>, version: string, setVersion: TDispatch<string>, navigate: NavigateFunction, ver?: string })  {
  const _ver = (ver || version) || latestVersion;
  const [prevVersion, setPrevVersion] = useState('');

  const isValidVersion = versions.includes(_ver);
  const isVersionChanged = prevVersion !== _ver;
  console.log({isVersionChanged, _ver, prevVersion})

  const redirect = useMemo(() => {
    let redirect;
    if (!isValidVersion) {
      redirect = () => navigate('/', { replace: true });
    }
    else {
      if (isVersionChanged) {
        console.log('changed to', _ver)
        CONFIGS_DATA.version = _ver;
        MODS_CONFIGS_DATA.version = _ver;
        CONFIGS_DATA.fetch(_ver, configs);
        MODS_CONFIGS_DATA.fetch(_ver, modsConfigs);
      }
    }
    return redirect;
  }, [_ver, isValidVersion, isVersionChanged]);

  useEffect(() => {
    if (!version) setVersion(_ver);
    if (isVersionChanged) setPrevVersion(_ver);
  }, [version]);

  useEffect(() => {
    if (redirect) redirect();
  }, [redirect]);
}

export default useInit;