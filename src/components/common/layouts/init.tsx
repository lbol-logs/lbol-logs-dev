import { useNavigate } from 'react-router-dom';
import useInit from 'hooks/useInit';
import { ReactNode, useContext, useState } from 'react';
import { CommonContext } from 'contexts/commonContext';
import Loading from './loading';
import { TObj } from 'utils/types/common';

const defaultIsInitilized: TObj<boolean> = {};

function Init({ children, ver }: { children?: ReactNode, ver?: string }) {
  const { version, setVersion } = useContext(CommonContext);
  const [isInitialized, setIsInitialized] = useState(defaultIsInitilized);
  const navigate = useNavigate();
  useInit({ version, setVersion, navigate, isInitialized, setIsInitialized, ver });

  if (!isInitialized[version]) return <Loading />;

  return <>
    {children}
  </>;
}

export default Init;