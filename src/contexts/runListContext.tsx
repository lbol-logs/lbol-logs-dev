import { createContext, ReactNode, useState } from 'react';
import {  TDispatch } from 'utils/types/common';
import { TFilter } from 'utils/types/others';

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