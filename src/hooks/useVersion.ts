import { versions } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useVersion(ver: string)  {
  const { version, setVersion } = useContext(CommonContext);

  const isChanged = ver !== version;
  const isValidVersion = versions.includes(ver);

  if (isChanged && isValidVersion) {
    setVersion(ver);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!isValidVersion) {
      navigate('/', { replace: true });
    }
  }, [navigate, isValidVersion]);
}

export default useVersion;