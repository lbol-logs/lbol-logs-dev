import { defaultHoldingsHeight, defaultHoldingsWidth } from 'configs/globals';
import { createContext, ReactNode, useState } from 'react';
import { AsideType, TAsideHoldings, TConfigsData, TDispatch } from 'utils/types/common';

const defaultVersion = '';
const defaultConfigsData = {};
const defaultAsideHoldings = AsideType.none;

type TCommonContext = {
  version: string
  setVersion: TDispatch<string>,
  configsData: TConfigsData;
  setConfigsData: TDispatch<TConfigsData>,
  holdingsHeight: number,
  setHoldingsHeight: TDispatch<number>,
  holdingsWidth: number,
  setHoldingsWidth: TDispatch<number>
  asideHoldings: TAsideHoldings,
  setAsideHoldings: TDispatch<TAsideHoldings>
};

export const CommonContext = createContext<TCommonContext>({
  version: defaultVersion,
  setVersion: () => {},
  configsData: defaultConfigsData,
  setConfigsData: () => {},
  holdingsHeight: defaultHoldingsHeight,
  setHoldingsHeight: () => {},
  holdingsWidth: defaultHoldingsWidth,
  setHoldingsWidth: () => {},
  asideHoldings: defaultAsideHoldings,
  setAsideHoldings: () => {}
});

function CommonProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(defaultVersion);
  const [configsData, setConfigsData] = useState(defaultConfigsData);
  const [holdingsHeight, setHoldingsHeight] = useState(defaultHoldingsHeight);
  const [holdingsWidth, setHoldingsWidth] = useState(defaultHoldingsWidth);
  const [asideHoldings, setAsideHoldings] = useState(defaultAsideHoldings);

  const value = {
    version,
    setVersion,
    configsData,
    setConfigsData,
    holdingsHeight,
    setHoldingsHeight,
    holdingsWidth,
    setHoldingsWidth,
    asideHoldings,
    setAsideHoldings
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;