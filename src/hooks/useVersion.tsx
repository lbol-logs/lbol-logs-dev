import { commonConfigs, versions } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TConfigsData } from 'utils/types/common';
import { Navigate } from 'react-router-dom';

function useVersion(ver?: string)  {
  const { version, setVersion, configsData, setConfigsData } = useContext(CommonContext);

  ver = ver || version;
  const isChanged = ver !== version;
  const isValidVersion = versions.includes(ver);

  if (isChanged && isValidVersion) {
    setVersion(ver);
  }

  if (isChanged || commonConfigs.some(config => !(config in configsData))) {
    const currentConfigs: TConfigsData = {};
    for (const config of commonConfigs) {
      const configs = use(getConfigs(ver, config));
      currentConfigs[config] = configs;
    }
    setConfigsData(currentConfigs);
  }

  let redirect = null;
  if (!isValidVersion) redirect = <Navigate to="/" replace />;

  return [isValidVersion, redirect];
}

export default useVersion;