import { createContext, ReactNode, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TPool } from 'utils/types/others';
import { TCards } from 'utils/types/runData';

const defaultFilter: TPool = {};
const defaultValidCards: TCards = [];
const defaultLastValidCards: TCards = [];
const defaultAddedValidCards: TCards = [];
const defaultRemovedValidCards: TCards = [];

type TCardPoolContext = {
  filter: TPool
  setFilter: TDispatch<TPool>,
  validCards: TCards,
  setValidCards: TDispatch<TCards>,
  addedValidCards: TCards,
  setAddedValidCards: TDispatch<TCards>,
  removedValidCards: TCards,
  setRemovedValidCards: TDispatch<TCards>
};

export const CardPoolContext = createContext<TCardPoolContext>({
  filter: defaultFilter,
  setFilter: () => {},
  validCards: defaultValidCards,
  setValidCards: () => {},
  addedValidCards: defaultAddedValidCards,
  setAddedValidCards: () => {},
  removedValidCards: defaultRemovedValidCards,
  setRemovedValidCards: () => {}
});

function CardPoolProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [validCards, setValidCards] = useState(defaultValidCards);
  const [addedValidCards, setAddedValidCards] = useState(defaultAddedValidCards);
  const [removedValidCards, setRemovedValidCards] = useState(defaultRemovedValidCards);

  const value = {
    filter,
    setFilter,
    validCards,
    setValidCards,
    addedValidCards,
    setAddedValidCards,
    removedValidCards,
    setRemovedValidCards
  };

  return (
    <CardPoolContext.Provider value={value}>
      {children}
    </CardPoolContext.Provider>
  );
}

export default CardPoolProvider;