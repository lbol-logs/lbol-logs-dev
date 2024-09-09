import { commonConfigs, versions } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect, useMemo } from 'react';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TConfigsData } from 'utils/types/common';
import { Navigate } from 'react-router-dom';

function useVersion(ver?: string)  {
  const { version, setVersion, setConfigsData } = useContext(CommonContext);

  const _ver = ver || version;
  const isChanged = _ver !== version;
  const isValidVersion = versions.includes(_ver);

  if (isChanged && isValidVersion) {
    setVersion(_ver);
  }

  const currentConfigs = useMemo(() => {
    const currentConfigs: TConfigsData = {};
    for (const config of commonConfigs) {
      const configs = use(getConfigs(_ver, config));
      currentConfigs[config] = configs;
    }
    return currentConfigs;
  }, [_ver]);

  useEffect(() => {
    setConfigsData(currentConfigs);
  }, [currentConfigs]);

  let redirect = null;
  if (!isValidVersion) redirect = <Navigate to="/" replace />;

  return [isValidVersion, redirect];
}

export default useVersion;