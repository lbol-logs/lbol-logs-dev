import { latestVersion } from 'configs/globals';
import { createContext, useState } from 'react';
import { TConfigsData, TDispatch } from 'utils/types/common';

const defaultConfigsData = {};

type TCommonContext = {
  version: string
  setVersion: TDispatch<string>,
  configsData: TConfigsData;
  setConfigsData: TDispatch<TConfigsData>
};

export const CommonContext = createContext<TCommonContext>({
  version: latestVersion,
  setVersion: () => {},
  configsData: defaultConfigsData,
  setConfigsData: () => {}
});

function CommonProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState(latestVersion);
  const [configsData, setConfigsData] = useState(defaultConfigsData)

  const value = {
    version,
    setVersion,
    configsData,
    setConfigsData
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;