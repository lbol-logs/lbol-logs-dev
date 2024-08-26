import { Dispatch, SetStateAction } from 'react';

type TObj<T> = Record<string, T>;
type TObjAny = TObj<any>;
type TObjNumber = TObj<number>;
type TObjString = TObj<string>;
type TObjStringOrArray = TObj<string | Array<string>>;
type TObjElement = TObj<JSX.Element>;

type TRange3 = 0 | 1 | 2 | 3;
type TRange4 = 0 | 1 | 2 | 3 | 4;
type TRange16 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

type TDispatch<T> = Dispatch<SetStateAction<T>>;

type TConfigsData = TObj<TObjAny>;

export type {
  TObj,
  TObjAny,
  TObjNumber,
  TObjString,
  TObjStringOrArray,
  TObjElement,
  TDispatch,
  TRange3,
  TRange4,
  TRange16,
  TConfigsData
};