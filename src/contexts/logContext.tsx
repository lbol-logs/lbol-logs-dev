import holdingsReducer from 'hooks/holdingsReducer';
import { createContext, useReducer, useState } from 'react';
import { TDispatch, TObjAny } from 'utils/types/common';
import { TAct, THoldingChange, THoldings, THoldingsReducer, TLevel, TRunData } from 'utils/types/runData';

const defaultIsRunDataLoaded = false;
const defaultRunDataId = '';
const defaultRunData = {} as TRunData;
const defaultAct: TAct = 0;
const defaultLevel: TLevel = 0;
const defaultIsStationsLoaded = false;
const defaultHoldings = [] as THoldings;
const defaultShowMap = true;
const defaultIgnoredPaths = [] as Array<THoldingChange>;
const defaultConfigsData = {};

type TLogContext = {
  isRunDataLoaded: boolean,
  setIsRunDataLoaded: TDispatch<boolean>,
  runDataId: string,
  setRunDataId: TDispatch<string>,
  runData: TRunData,
  setRunData: TDispatch<TRunData>,
  act: TAct,
  setAct: TDispatch<TAct>,
  level: TLevel,
  setLevel: TDispatch<TLevel>,
  isStationsLoaded: boolean,
  setIsStationsLoaded: TDispatch<boolean>,
  holdings: THoldings,
  dispatchHoldings: THoldingsReducer,
  showMap: boolean,
  setShowMap: TDispatch<boolean>,
  ignoredPaths: Array<THoldingChange>,
  setIgnoredPaths: TDispatch<Array<THoldingChange>>,
  configsData: Record<string, TObjAny>;
  setConfigsData: TDispatch<Record<string, TObjAny>>
};

export const LogContext = createContext<TLogContext>({
  isRunDataLoaded: defaultIsRunDataLoaded,
  setIsRunDataLoaded: () => {},
  runDataId: defaultRunDataId,
  setRunDataId: () => {},
  runData: defaultRunData,
  setRunData: () => {},
  act: defaultAct,
  setAct: () => {},
  level: defaultLevel,
  setLevel: () => {},
  isStationsLoaded: defaultIsStationsLoaded,
  setIsStationsLoaded: () => {},
  holdings: defaultHoldings,
  dispatchHoldings: () => {},
  showMap: defaultShowMap,
  setShowMap: () => {},
  ignoredPaths: defaultIgnoredPaths,
  setIgnoredPaths: () => {},
  configsData: defaultConfigsData,
  setConfigsData: () => {}
});

function LogProvider({ children }: { children: React.ReactNode }) {
  const [isRunDataLoaded, setIsRunDataLoaded] = useState(defaultIsRunDataLoaded);
  const [runDataId, setRunDataId] = useState(defaultRunDataId);
  const [runData, setRunData] = useState(defaultRunData);
  const [act, setAct] = useState(defaultAct);
  const [level, setLevel] = useState(defaultLevel);
  const [isStationsLoaded, setIsStationsLoaded] = useState(defaultIsStationsLoaded);
  const [holdings, dispatchHoldings] = useReducer(holdingsReducer, defaultHoldings);
  const [showMap, setShowMap] = useState(defaultShowMap);
  const [ignoredPaths, setIgnoredPaths] = useState(defaultIgnoredPaths);
  const [configsData, setConfigsData] = useState(defaultConfigsData)

  const value = {
    isRunDataLoaded,
    setIsRunDataLoaded,
    runDataId,
    setRunDataId,
    runData,
    setRunData,
    act,
    setAct,
    level,
    setLevel,
    isStationsLoaded,
    setIsStationsLoaded,
    holdings,
    dispatchHoldings,
    showMap,
    setShowMap,
    ignoredPaths,
    setIgnoredPaths,
    configsData,
    setConfigsData
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;