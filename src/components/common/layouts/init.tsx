import { useNavigate } from 'react-router-dom';
import useInit from 'hooks/useInit';
import { ReactNode, useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';

function Init({ configs, modsConfigs = [], children, ver }: { configs: Array<string>, modsConfigs?: Array<string>, children?: ReactNode, ver?: string }) {
  const { version, setVersion } = useContext(CommonContext);
  const navigate = useNavigate();
  useInit({ configs, modsConfigs, version, setVersion, navigate, ver });

  if (!version) return null;

  return (
    <>
      {children}
    </>
  );
}

export default Init;