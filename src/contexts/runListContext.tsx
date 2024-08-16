import { createContext, ReactNode, useState } from 'react';
import {  TDispatch, TObj } from 'utils/types/common';

type TFilter = TObj<Array<string>>;

const defaultFilter: TFilter = {};

type TRunListContext = {
  filter: TFilter
  setFilter: TDispatch<TFilter>
};

export const RunListContext = createContext<TRunListContext>({
  filter: defaultFilter,
  setFilter: () => {}
});

function RunListProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);

  const value = {
    filter,
    setFilter
  };

  return (
    <RunListContext.Provider value={value}>
      {children}
    </RunListContext.Provider>
  );
}

export default RunListProvider;