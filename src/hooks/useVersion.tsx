import { commonConfigs, versions } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TConfigsData } from 'utils/types/common';
import { Navigate } from 'react-router-dom';

function useVersion(ver: string)  {
  const { version, setVersion, setConfigsData } = useContext(CommonContext);

  const isChanged = ver !== version;
  const isValidVersion = versions.includes(ver);
  const currentConfigs: TConfigsData = {};
  for (const config of commonConfigs) {
    const configs = use(getConfigs(ver, config));
    currentConfigs[config] = configs;
  }

  if (isChanged && isValidVersion) {
    setVersion(ver);
  }

  useEffect(() => {
    setConfigsData(currentConfigs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ver]);

  let redirect = null;
  if (!isValidVersion) redirect = <Navigate to="/" replace />;

  return [isValidVersion, redirect];
}

export default useVersion;