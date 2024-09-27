import { commonConfigs, CONFIGS_DATA, configsData, latestVersion, versions } from 'configs/globals';
import { useEffect, useMemo } from 'react';
import { getConfigsUrl } from 'utils/functions/fetchData';
import { TDispatch, TObj } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Configs from 'utils/classes/Configs';
import { getConfigsKey } from 'utils/functions/helpers';

function useInit({ version, setVersion, navigate, isInitialized, setIsInitialized, ver }: { version: string, setVersion: TDispatch<string>, navigate: NavigateFunction, isInitialized: TObj<boolean>, setIsInitialized: TDispatch<TObj<boolean>>, ver?: string })  {
  const [_ver, isValidVersion, isValidInit] = useMemo(() => {
    const _ver = (ver || version) || latestVersion;
    const isChanged = _ver !== version;
    const isValidVersion = versions.includes(_ver);
    const isValidInit = isChanged && isValidVersion;

    return [_ver, isValidVersion, isValidInit];
  }, [ver]);

  const redirect = useMemo(() => {
    let redirect;
    if (!isValidVersion) {
      redirect = () => navigate('/', { replace: true });
    }
    else {
      if (isValidInit) {
        (async () => {
          CONFIGS_DATA.version = _ver;
          for (const name of commonConfigs) {
            const key = getConfigsKey(name);
            if (key in configsData) continue;
            const response = await fetch(getConfigsUrl(_ver, name));
            const json = await response.json();
            CONFIGS_DATA.set(key, new Configs(json));
          }
          flushSync(() => {
            setVersion(_ver);
            setIsInitialized(Object.assign(isInitialized, { [_ver]: true }));
          });
        })();
      }


    }
    return redirect;
  }, [_ver, isValidVersion, isValidInit]);

  useEffect(() => {
    if (redirect) redirect();
  }, [redirect]);

  return isInitialized;
}

export default useInit;