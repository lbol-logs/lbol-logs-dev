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

type TFilterCheckbox = TObj<Array<string>>
type TFilterRadio = {
  et?: string
  rt?: string
};
type TFilter = TFilterRadio & TFilterCheckbox;

export type {
  TRunList,
  TAboutComponent,
  TChoice,
  TPromise,
  TFilterCheckbox,
  TFilterRadio,
  TFilter
};