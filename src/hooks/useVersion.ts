import { commonConfigs, versions } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getConfigs } from 'utils/functions/fetchData';
import use from 'utils/functions/use';
import { TConfigsData } from 'utils/types/common';

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

  const navigate = useNavigate();
  useEffect(() => {
    setConfigsData(currentConfigs);
    if (!isValidVersion) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, isValidVersion]);
}

export default useVersion;