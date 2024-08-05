type TObj<T> = Record<string, T>;
type TObjAny = TObj<any>;
type TObjNumber = TObj<number>;
type TObjString = TObj<string>;
type TObjStringOrArray = TObj<string | Array<string>>;

type TRange3 = 0 | 1 | 2 | 3;
type TRange4 = 0 | 1 | 2 | 3 | 4;
type TRange16 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

type TDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type {
  TObj,
  TObjAny,
  TObjNumber,
  TObjString,
  TObjStringOrArray,
  TDispatch,
  TRange3,
  TRange4,
  TRange16
};