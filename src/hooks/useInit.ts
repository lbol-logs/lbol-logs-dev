import { commonConfigs, latestVersion, versions } from 'configs/globals';
import { useEffect, useMemo } from 'react';
import { getConfigsUrl } from 'utils/functions/fetchData';
import { TConfigsData, TDispatch, TObj } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';

function useInit({ version, setVersion, setConfigsData, navigate, isInitialized, setIsInitialized, ver }: { version: string, setVersion: TDispatch<string>, setConfigsData: TDispatch<TConfigsData>, navigate: NavigateFunction, isInitialized: TObj<boolean>, setIsInitialized: TDispatch<TObj<boolean>>, ver?: string })  {
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
          const currentConfigs: TConfigsData = {};
          for (const name of commonConfigs) {
            // const configs = use(getConfigs(_ver, config));
            const response = await fetch(getConfigsUrl(_ver, name));
            const json = await response.json();
            currentConfigs[name] = json;
          }
          flushSync(() => {
            setConfigsData(currentConfigs);
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