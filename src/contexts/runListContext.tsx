import { createContext, ReactNode, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TFilter, TRunList } from 'utils/types/others';

const defaultFilter: TFilter = {};
const defaultShowFilter: boolean = false;
const defaultList: TRunList = [];
const defaultFilteredList: TRunList = [];

type TRunListContext = {
  filter: TFilter
  setFilter: TDispatch<TFilter>,
  showFilter: boolean,
  setShowFilter: TDispatch<boolean>,
  list: TRunList,
  setList: TDispatch<TRunList>,
  filteredList: TRunList,
  setFilteredList: TDispatch<TRunList>
};

export const RunListContext = createContext<TRunListContext>({
  filter: defaultFilter,
  setFilter: () => {},
  showFilter: defaultShowFilter,
  setShowFilter: () => {},
  list: defaultList,
  setList: () => {},
  filteredList: defaultFilteredList,
  setFilteredList: () => {}
});

function RunListProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [showFilter, setShowFilter] = useState(defaultShowFilter);
  const [list, setList] = useState(defaultList);
  const [filteredList, setFilteredList] = useState(defaultFilteredList);

  const value = {
    filter,
    setFilter,
    showFilter,
    setShowFilter,
    list,
    setList,
    filteredList,
    setFilteredList
  };

  return (
    <RunListContext.Provider value={value}>
      {children}
    </RunListContext.Provider>
  );
}

export default RunListProvider;