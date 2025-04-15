import { TObj, TObjAny, TRange4 } from './common';
import { TAct, TCard, TCards, TExhibit, TExhibitObj, TJadeBox, TLevel, TMod, TRequest, TRequests, TStation, TStatusEffect } from './runData';

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

type TChoice = TRange4 | string;

type TPromise = {
  status: string,
  value: TObjAny,
  reason: TObjAny,
  then: (result: TObjAny, error: TObjAny) => {}
};

type TFilterText = {
  na?: string,
  no?: string
};
type TFilterRadio = {
  et?: string
  rt?: string
};
type TFilterCheckbox = TObj<Array<string>>;
type TFilter = TFilterText & TFilterRadio & TFilterCheckbox;

type TPoolRadio = {
  ch?: string
  et?: string,
  pp?: string,
  jc?: string,
  ft?: string
};
type TPoolCheckbox = {
  ex?: Array<string>,
  co?: Array<string>
  rr?: Array<string>,
  ct?: Array<string>,
  tc?: Array<string>
};
type TPool = TPoolRadio & TPoolCheckbox;

type TEventComponent = ({ station }: { station: TStation }) => JSX.Element;

type TRounds = {
  current: number,
  minRound: number,
  maxRound: number,
  act: TAct,
  maxLevel: TLevel
};

type TRequestObj = {
  Id: TRequest
};
type TJadeBoxObj = {
  Id: TJadeBox
};
type TEntityModal = {
  card?: TCard,
  exhibit?: TExhibitObj,
  statusEffect?: TStatusEffect,
  request?: TRequestObj,
  jadeBox?: TJadeBoxObj
};

type TCardMana = Array<string>;

type TModConfigs = TMod & {
  Character?: string,
  Url? : string
};

type TCardPool = TObj<TCards>;

enum ErrorType {
  invalidFile = 'invalidFile',
  invalidVersion = 'invalidVersion',
  alreadyExist = 'alreadyExist',
  unknownError = 'unknownError'
};

export type {
  TRunListItem,
  TRunList,
  TAboutComponent,
  TChoice,
  TPromise,
  TFilterText,
  TFilterRadio,
  TFilterCheckbox,
  TFilter,
  TPoolRadio,
  TPoolCheckbox,
  TPool,
  TEventComponent,
  TRounds,
  TRequestObj,
  TJadeBoxObj,
  TEntityModal,
  TCardMana,
  TModConfigs,
  TCardPool
};

export {
  ErrorType
};