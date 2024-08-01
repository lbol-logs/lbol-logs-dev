import { createContext, useState } from "react";
import { TRunData } from "utils/types";

type TLogContext = {
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  runData: TRunData,
  setRunData: React.Dispatch<React.SetStateAction<TRunData>>
};

export const LogContext = createContext<TLogContext>({
  isLoading: false,
  setIsLoading: () => {},
  runData: {},
  setRunData: () => {}
});

function LogProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [runData, setRunData] = useState({});
  const value = {
    isLoading,
    setIsLoading,
    runData,
    setRunData
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;