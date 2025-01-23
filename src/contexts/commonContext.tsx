import { defaultHoldingsHeight, defaultHoldingsWidth } from 'configs/globals';
import { createContext, ReactNode, useState } from 'react';
import { AsideType, TAsideHoldings, TDispatch, TObjNumber } from 'utils/types/common';
import { TEntityModal } from 'utils/types/others';

const defaultVersion = '';
const defaultAsideHoldings = AsideType.none;
const defaultTopScrollHeights = {};
const defaultEntityModal = {};
const defaultTempRedirectVersion = '';

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
  setTopScrollHeights: TDispatch<TObjNumber>,
  entityModal: TEntityModal,
  setEntityModal: TDispatch<TEntityModal>,
  tempRedirectVersion: string,
  setTempRedirectVersion: TDispatch<string>
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
  setTopScrollHeights: () => {},
  entityModal: defaultEntityModal,
  setEntityModal: () => {},
  tempRedirectVersion: defaultTempRedirectVersion,
  setTempRedirectVersion: () => {}
});

function CommonProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(defaultVersion);
  const [holdingsHeight, setHoldingsHeight] = useState(defaultHoldingsHeight);
  const [holdingsWidth, setHoldingsWidth] = useState(defaultHoldingsWidth);
  const [asideHoldings, setAsideHoldings] = useState(defaultAsideHoldings);
  const [topScrollHeights, setTopScrollHeights] = useState(defaultTopScrollHeights);
  const [entityModal, setEntityModal] = useState(defaultEntityModal);
  const [tempRedirectVersion, setTempRedirectVersion] = useState(defaultTempRedirectVersion);

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
    setTopScrollHeights,
    entityModal,
    setEntityModal,
    tempRedirectVersion,
    setTempRedirectVersion
  };

  return (
    <CommonContext.Provider value={value}>
      {children}
    </CommonContext.Provider>
  );
}

export default CommonProvider;