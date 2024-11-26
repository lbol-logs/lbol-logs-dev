import { createContext, ReactNode, useState } from 'react';
import { TDispatch } from 'utils/types/common';
import { TCardPool, TPool } from 'utils/types/others';

const defaultFilter: TPool = {};
const defaultValidCards: TCardPool = {};
const defaultAddedValidCards: TCardPool = {};
const defaultRemovedValidCards: TCardPool = {};
const defaultShowDiff: boolean = true;

type TCardPoolContext = {
  filter: TPool
  setFilter: TDispatch<TPool>,
  validCards: TCardPool,
  setValidCards: TDispatch<TCardPool>,
  addedValidCards: TCardPool,
  setAddedValidCards: TDispatch<TCardPool>,
  removedValidCards: TCardPool,
  setRemovedValidCards: TDispatch<TCardPool>,
  showDiff: boolean,
  setShowDiff: TDispatch<boolean>
};

export const CardPoolContext = createContext<TCardPoolContext>({
  filter: defaultFilter,
  setFilter: () => {},
  validCards: defaultValidCards,
  setValidCards: () => {},
  addedValidCards: defaultAddedValidCards,
  setAddedValidCards: () => {},
  removedValidCards: defaultRemovedValidCards,
  setRemovedValidCards: () => {},
  showDiff: defaultShowDiff,
  setShowDiff: () => {}
});

function CardPoolProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(defaultFilter);
  const [validCards, setValidCards] = useState(defaultValidCards);
  const [addedValidCards, setAddedValidCards] = useState(defaultAddedValidCards);
  const [removedValidCards, setRemovedValidCards] = useState(defaultRemovedValidCards);
  const [showDiff, setShowDiff] = useState(defaultShowDiff);

  const value = {
    filter,
    setFilter,
    validCards,
    setValidCards,
    addedValidCards,
    setAddedValidCards,
    removedValidCards,
    setRemovedValidCards,
    showDiff,
    setShowDiff
  };

  return (
    <CardPoolContext.Provider value={value}>
      {children}
    </CardPoolContext.Provider>
  );
}

export default CardPoolProvider;