import { createContext, ReactNode, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TPool, TRunList } from 'utils/types/others';

const defaultFilter: TPool = {};
const defaultShowFilter: boolean = false;
const defaultList: TRunList = [];
const defaultFilteredList: TRunList = [];

type TCardPoolContext = {
  filter: TPool
  setFilter: TDispatch<TPool>,
  showFilter: boolean,
  setShowFilter: TDispatch<boolean>,
  list: TRunList,
  setList: TDispatch<TRunList>,
  filteredList: TRunList,
  setFilteredList: TDispatch<TRunList>
};

export const CardPoolContext = createContext<TCardPoolContext>({
  filter: defaultFilter,
  setFilter: () => {},
  showFilter: defaultShowFilter,
  setShowFilter: () => {},
  list: defaultList,
  setList: () => {},
  filteredList: defaultFilteredList,
  setFilteredList: () => {}
});

function CardPoolProvider({ children }: { children: ReactNode }) {
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
    <CardPoolContext.Provider value={value}>
      {children}
    </CardPoolContext.Provider>
  );
}

export default CardPoolProvider;