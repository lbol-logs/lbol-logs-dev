import { TObj, TObjAny, TObjStringOrArray, TRange3 } from './common';

type TRunList = TObj<TObjStringOrArray>;

type TAboutComponent = {
  className: string,
  category: string,
  array: Array<string>
};

type TChoice = TRange3;

type TPromise = {
  status: string,
  value: TObjAny,
  reason: TObjAny,
  then: (result: TObjAny, error: TObjAny) => {}
};

type TFilter = TObj<Array<string>>;

export type {
  TRunList,
  TAboutComponent,
  TChoice,
  TPromise,
  TFilter
};