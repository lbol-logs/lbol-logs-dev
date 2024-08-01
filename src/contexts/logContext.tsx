import { createContext, useState } from 'react';
import { TAct, TLevel, TRunData } from 'utils/types';

const defaultIsLoading = true;
const defaultRunData = {};
const defaultAct: TAct = 0;
const defaultLevel: TLevel = 0;

type TLogContext = {
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  runData: TRunData,
  setRunData: React.Dispatch<React.SetStateAction<TRunData>>,
  act: TAct,
  setAct: React.Dispatch<React.SetStateAction<TAct>>,
  level: TLevel,
  setLevel: React.Dispatch<React.SetStateAction<TLevel>>,
};

export const LogContext = createContext<TLogContext>({
  isLoading: defaultIsLoading,
  setIsLoading: () => {},
  runData: defaultRunData,
  setRunData: () => {},
  act: defaultAct,
  setAct: () => {},
  level: defaultLevel,
  setLevel: () => {}
});

function LogProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(defaultIsLoading);
  const [runData, setRunData] = useState(defaultRunData);
  const [act, setAct] = useState(defaultAct);
  const [level, setLevel] = useState(defaultLevel);

  const value = {
    isLoading,
    setIsLoading,
    runData,
    setRunData,
    act,
    setAct,
    level,
    setLevel
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;