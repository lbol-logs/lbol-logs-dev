import { createContext, ReactNode, useState } from 'react';
import {  TDispatch } from 'utils/types/common';
import { TFilter } from 'utils/types/others';

const defaultFilter: TFilter = {};
const defaultShowFilter: boolean = false;

type TRunListContext = {
  filter: TFilter
  setFilter: TDispatch<TFilter>,
  showFilter: boolean,
  setShowFilter: TDispatch<boolean>
};

export const RunListContext = createContext<TRunListContext>({
  filter: defaultFilter,
  setFilter: () => {},
  showFilter: defaultShowFilter,
  setShowFilter: () => {}
});

function RunListProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [showFilter, setShowFilter] = useState(defaultShowFilter);

  const value = {
    filter,
    setFilter,
    showFilter,
    setShowFilter
  };

  return (
    <RunListContext.Provider value={value}>
      {children}
    </RunListContext.Provider>
  );
}

export default RunListProvider;