import { createContext, ReactNode, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TPool, TRunList } from 'utils/types/others';

type TCardIds = Array<string>;

export type {
  TCardIds
};

const defaultFilter: TPool = {};
const defaultFilteredPool: TCardIds = [];

type TCardPoolContext = {
  filter: TPool
  setFilter: TDispatch<TPool>,
  filteredPool: TCardIds,
  setFilteredPool: TDispatch<TCardIds>
};

export const CardPoolContext = createContext<TCardPoolContext>({
  filter: defaultFilter,
  setFilter: () => {},
  filteredPool: defaultFilteredPool,
  setFilteredPool: () => {}
});

function CardPoolProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [filteredPool, setFilteredPool] = useState(defaultFilteredPool);

  const value = {
    filter,
    setFilter,
    filteredPool,
    setFilteredPool
  };

  return (
    <CardPoolContext.Provider value={value}>
      {children}
    </CardPoolContext.Provider>
  );
}

export default CardPoolProvider;