import { defaultRunData } from 'configs/globals';
import holdingsReducer from 'hooks/holdingsReducer';
import { createContext, ReactNode, useReducer, useState } from 'react';
import { TConfigsData, TDispatch } from 'utils/types/common';
import { TRounds } from 'utils/types/others';
import { TAct, THoldingChange, THoldings, THoldingsReducer, TLevel, TRunData } from 'utils/types/runData';
import Processing from 'components/common/layouts/processing';

const defaultIsRunDataLoaded = false;
const defaultRunDataId = '';
const defaultAct: TAct = 0;
const defaultLevel: TLevel = 0;
const defaultRounds: TRounds = {} as TRounds;
const defaultIsStationsLoaded = false;
const defaultHoldings = [] as THoldings;
const defaultShowMap = true;
const defaultIgnoredPaths = [] as Array<THoldingChange>;
const defaultConfigsData = {};
const defaultHolding = <Processing />;

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
  rounds: TRounds,
  setRounds: TDispatch<TRounds>,
  isStationsLoaded: boolean,
  setIsStationsLoaded: TDispatch<boolean>,
  holdings: THoldings,
  dispatchHoldings: THoldingsReducer,
  showMap: boolean,
  setShowMap: TDispatch<boolean>,
  ignoredPaths: Array<THoldingChange>,
  setIgnoredPaths: TDispatch<Array<THoldingChange>>,
  configsData: TConfigsData;
  setConfigsData: TDispatch<TConfigsData>,
  holding: JSX.Element,
  setHolding: TDispatch<JSX.Element>
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
  rounds: defaultRounds,
  setRounds: () => {},
  isStationsLoaded: defaultIsStationsLoaded,
  setIsStationsLoaded: () => {},
  holdings: defaultHoldings,
  dispatchHoldings: () => {},
  showMap: defaultShowMap,
  setShowMap: () => {},
  ignoredPaths: defaultIgnoredPaths,
  setIgnoredPaths: () => {},
  configsData: defaultConfigsData,
  setConfigsData: () => {},
  holding: defaultHolding,
  setHolding: () => {},
});

function LogProvider({ children }: { children: ReactNode }) {
  const [isRunDataLoaded, setIsRunDataLoaded] = useState(defaultIsRunDataLoaded);
  const [runDataId, setRunDataId] = useState(defaultRunDataId);
  const [runData, setRunData] = useState(defaultRunData);
  const [act, setAct] = useState(defaultAct);
  const [level, setLevel] = useState(defaultLevel);
  const [rounds, setRounds] = useState(defaultRounds);
  const [isStationsLoaded, setIsStationsLoaded] = useState(defaultIsStationsLoaded);
  const [holdings, dispatchHoldings] = useReducer(holdingsReducer, defaultHoldings);
  const [showMap, setShowMap] = useState(defaultShowMap);
  const [ignoredPaths, setIgnoredPaths] = useState(defaultIgnoredPaths);
  const [configsData, setConfigsData] = useState(defaultConfigsData);
  const [holding, setHolding] = useState(defaultHolding);

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
    rounds,
    setRounds,
    isStationsLoaded,
    setIsStationsLoaded,
    holdings,
    dispatchHoldings,
    showMap,
    setShowMap,
    ignoredPaths,
    setIgnoredPaths,
    configsData,
    setConfigsData,
    holding,
    setHolding
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;