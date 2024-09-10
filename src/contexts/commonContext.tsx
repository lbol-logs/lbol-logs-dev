import { defaultHoldingsHeight } from 'configs/globals';
import { createContext, ReactNode, useState } from 'react';
import { TConfigsData, TDispatch } from 'utils/types/common';

const defaultVersion = '';
const defaultConfigsData = {};

type TCommonContext = {
  version: string
  setVersion: TDispatch<string>,
  configsData: TConfigsData;
  setConfigsData: TDispatch<TConfigsData>,
  holdingsHeight: number,
  setHoldingsHeight: TDispatch<number>
};

export const CommonContext = createContext<TCommonContext>({
  version: defaultVersion,
  setVersion: () => {},
  configsData: defaultConfigsData,
  setConfigsData: () => {},
  holdingsHeight: defaultHoldingsHeight,
  setHoldingsHeight: () => []
});

function CommonProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(defaultVersion);
  const [configsData, setConfigsData] = useState(defaultConfigsData);
  const [holdingsHeight, setHoldingsHeight] = useState(defaultHoldingsHeight);

  const value = {
    version,
    setVersion,
    configsData,
    setConfigsData,
    holdingsHeight,
    setHoldingsHeight
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;