import { commonConfigs, CONFIGS_DATA, latestVersion, MODS_CONFIGS_DATA, modsCommonConfigs, versions } from 'configs/globals';
import { useEffect, useMemo } from 'react';
import { TDispatch, TObj } from 'utils/types/common';
import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';

function useInit({ version, setVersion, navigate, isInitialized, setIsInitialized, ver }: { version: string, setVersion: TDispatch<string>, navigate: NavigateFunction, isInitialized: TObj<boolean>, setIsInitialized: TDispatch<TObj<boolean>>, ver?: string })  {
  const [_ver, isValidVersion] = useMemo(() => {
    const _ver = (ver || version) || latestVersion;
    const isValidVersion = versions.includes(_ver);
    return [_ver, isValidVersion];
  }, [ver]);

  const redirect = useMemo(() => {
    let redirect;
    if (!isValidVersion) {
      redirect = () => navigate('/', { replace: true });
    }
    else {
      (async () => {
        await CONFIGS_DATA.fetchAsync(_ver, commonConfigs);
        await MODS_CONFIGS_DATA.fetchAsync(_ver, modsCommonConfigs);

        flushSync(() => {
          setVersion(_ver);
          setIsInitialized(Object.assign(isInitialized, { [_ver]: true }));
        });
      })();
    }
    return redirect;
  }, [_ver, isValidVersion]);

  useEffect(() => {
    if (redirect) redirect();
  }, [redirect]);

  return isInitialized;
}

export default useInit;