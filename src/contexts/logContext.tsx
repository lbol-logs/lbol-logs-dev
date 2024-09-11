import { defaultRunData } from 'configs/globals';
import holdingsReducer from 'hooks/holdingsReducer';
import { createContext, ReactNode, useReducer, useState } from 'react';
import { TConfigsData, TDispatch } from 'utils/types/common';
import { TRound } from 'utils/types/others';
import { TAct, THoldingChange, THoldings, THoldingsReducer, TLevel, TRunData } from 'utils/types/runData';

const defaultIsRunDataLoaded = false;
const defaultRunDataId = '';
const defaultAct: TAct = 0;
const defaultLevel: TLevel = 0;
const defaultRound: TRound = undefined;
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
  round: TRound,
  setRound: TDispatch<TRound>,
  isStationsLoaded: boolean,
  setIsStationsLoaded: TDispatch<boolean>,
  holdings: THoldings,
  dispatchHoldings: THoldingsReducer,
  showMap: boolean,
  setShowMap: TDispatch<boolean>,
  ignoredPaths: Array<THoldingChange>,
  setIgnoredPaths: TDispatch<Array<THoldingChange>>,
  configsData: TConfigsData;
  setConfigsData: TDispatch<TConfigsData>
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
  round: defaultRound,
  setRound: () => {},
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

function LogProvider({ children }: { children: ReactNode }) {
  const [isRunDataLoaded, setIsRunDataLoaded] = useState(defaultIsRunDataLoaded);
  const [runDataId, setRunDataId] = useState(defaultRunDataId);
  const [runData, setRunData] = useState(defaultRunData);
  const [act, setAct] = useState(defaultAct);
  const [level, setLevel] = useState(defaultLevel);
  const [round, setRound] = useState(defaultRound);
  const [isStationsLoaded, setIsStationsLoaded] = useState(defaultIsStationsLoaded);
  const [holdings, dispatchHoldings] = useReducer(holdingsReducer, defaultHoldings);
  const [showMap, setShowMap] = useState(defaultShowMap);
  const [ignoredPaths, setIgnoredPaths] = useState(defaultIgnoredPaths);
  const [configsData, setConfigsData] = useState(defaultConfigsData);

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
    round,
    setRound,
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