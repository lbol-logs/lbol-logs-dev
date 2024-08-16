import { createContext, ReactNode, useState } from 'react';
import {  TDispatch } from 'utils/types/common';

const defaultArray: TArray = [];

type TArray = Array<string>;

type TRunListContext = {
  c: TArray
  setC: TDispatch<TArray>
};

export const RunListContext = createContext<TRunListContext>({
  c: defaultArray,
  setC: () => {}
});

function RunListProvider({ children }: { children: ReactNode }) {
  const [c, setC] = useState(defaultArray);

  const value = {
    c,
    setC
  };

  return (
    <RunListContext.Provider value={value}>
      {children}
    </RunListContext.Provider>
  );
}

export default RunListProvider;