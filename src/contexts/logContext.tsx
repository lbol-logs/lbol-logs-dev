import holdingsReducer from 'hooks/holdingsReducer';
import { createContext, useReducer, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TAct, THoldings, THoldingsReducer, TLevel, TRunData } from 'utils/types/runData';

const defaultIsRunDataLoaded = false;
const defaultRunData = {} as TRunData;
const defaultAct: TAct = 0;
const defaultLevel: TLevel = 0;
const defaultIsStationsLoaded = false;
const defaultHoldings = [] as THoldings;
const defaultShowMap = true;

type TLogContext = {
  isRunDataLoaded: boolean,
  setIsRunDataLoaded: TDispatch<boolean>,
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
  setShowMap: TDispatch<boolean>
};

export const LogContext = createContext<TLogContext>({
  isRunDataLoaded: defaultIsRunDataLoaded,
  setIsRunDataLoaded: () => {},
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
  setShowMap: () => {}
});

function LogProvider({ children }: { children: React.ReactNode }) {
  const [isRunDataLoaded, setIsRunDataLoaded] = useState(defaultIsRunDataLoaded);
  const [runData, setRunData] = useState(defaultRunData);
  const [act, setAct] = useState(defaultAct);
  const [level, setLevel] = useState(defaultLevel);
  const [isStationsLoaded, setIsStationsLoaded] = useState(defaultIsStationsLoaded);
  const [holdings, dispatchHoldings] = useReducer(holdingsReducer, defaultHoldings);
  const [showMap, setShowMap] = useState(defaultShowMap);

  const value = {
    isRunDataLoaded,
    setIsRunDataLoaded,
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
    setShowMap
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;