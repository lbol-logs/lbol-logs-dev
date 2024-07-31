import { createContext, useState } from "react";

type TLogContext = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
};

export const LogContext = createContext<TLogContext>({
  id: '',
  setId: () => {}
});

function LogProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState('');
  const value = {
    id,
    setId
  };

  return (
    <LogContext.Provider value={value}>
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;