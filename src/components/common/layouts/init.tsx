import { useNavigate } from 'react-router-dom';
import useInit from 'hooks/useInit';
import { ReactNode, useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';

function Init({ children, ver }: { children?: ReactNode, ver?: string }) {
  const { version, setVersion } = useContext(CommonContext);
  const navigate = useNavigate();
  useInit({ version, setVersion, navigate, ver });

  return (
    <>
      {children}
    </>
  );
}

export default Init;