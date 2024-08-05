import { TObj, TObjAny, TObjStringOrArray, TRange3 } from './common';

type TRunList = TObj<TObjStringOrArray>;

type TAboutComponent = {
  className: string,
  category: string,
  array: Array<string>
};

type TOption = TRange3;

type TPromise = {
  status: string,
  value: TObjAny,
  reason: TObjAny,
  then: (result: TObjAny, error: TObjAny) => {}
};

export type {
  TRunList,
  TAboutComponent,
  TOption,
  TPromise
};