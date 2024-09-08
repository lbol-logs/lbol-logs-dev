import { TObj, TObjAny, TObjStringOrArray, TRange3 } from './common';
import { TExhibit, TRequests } from './runData';

type TRunListItem = {
  id: string,
  name: string,
  character: string,
  type: string,
  shining: TExhibit,
  difficulty: string,
  requests: TRequests,
  result: string,
  timestamp: string
};

type TRunList = Array<TRunListItem>;

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

type TFilterText = {
  na?: string
};
type TFilterRadio = {
  et?: string
  rt?: string
};
type TFilterCheckbox = TObj<Array<string>>;
type TFilter = TFilterText & TFilterRadio & TFilterCheckbox;

export type {
  TRunListItem,
  TRunList,
  TAboutComponent,
  TChoice,
  TPromise,
  TFilterText,
  TFilterRadio,
  TFilterCheckbox,
  TFilter
};