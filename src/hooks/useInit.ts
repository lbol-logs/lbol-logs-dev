import { commonConfigs, configsData, latestVersion, versions } from 'configs/globals';
import { useEffect, useMemo } from 'react';
import { getConfigsUrl } from 'utils/functions/fetchData';
import { TConfigsData, TDispatch, TObj } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Configs from 'utils/classes/Configs';

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
          for (const name of commonConfigs) {
            const response = await fetch(getConfigsUrl(_ver, name));
            const json = await response.json();
            configsData[`${name}Configs`] = new Configs(json);
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