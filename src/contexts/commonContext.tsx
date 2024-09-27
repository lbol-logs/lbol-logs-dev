import { defaultHoldingsHeight, defaultHoldingsWidth } from 'configs/globals';
import { createContext, ReactNode, useState } from 'react';
import { AsideType, TAsideHoldings, TDispatch, TObjNumber } from 'utils/types/common';

const defaultVersion = '';
const defaultAsideHoldings = AsideType.none;
const defaultTopScrollHeights = {};

type TCommonContext = {
  version: string
  setVersion: TDispatch<string>,
  holdingsHeight: number,
  setHoldingsHeight: TDispatch<number>,
  holdingsWidth: number,
  setHoldingsWidth: TDispatch<number>
  asideHoldings: TAsideHoldings,
  setAsideHoldings: TDispatch<TAsideHoldings>,
  topScrollHeights: TObjNumber,
  setTopScrollHeights: TDispatch<TObjNumber>
};

export const CommonContext = createContext<TCommonContext>({
  version: defaultVersion,
  setVersion: () => {},
  holdingsHeight: defaultHoldingsHeight,
  setHoldingsHeight: () => {},
  holdingsWidth: defaultHoldingsWidth,
  setHoldingsWidth: () => {},
  asideHoldings: defaultAsideHoldings,
  setAsideHoldings: () => {},
  topScrollHeights: defaultTopScrollHeights,
  setTopScrollHeights: () => {}
});

function CommonProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(defaultVersion);
  const [holdingsHeight, setHoldingsHeight] = useState(defaultHoldingsHeight);
  const [holdingsWidth, setHoldingsWidth] = useState(defaultHoldingsWidth);
  const [asideHoldings, setAsideHoldings] = useState(defaultAsideHoldings);
  const [topScrollHeights, setTopScrollHeights] = useState(defaultTopScrollHeights);

  const value = {
    version,
    setVersion,
    holdingsHeight,
    setHoldingsHeight,
    holdingsWidth,
    setHoldingsWidth,
    asideHoldings,
    setAsideHoldings,
    topScrollHeights,
    setTopScrollHeights
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;