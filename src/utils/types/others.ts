import { TObj, TObjAny, TRange4 } from './common';
import { TAct, TCard, TExhibit, TExhibitObj, TJadeBox, TLevel, TMod, TRequest, TRequests, TStation, TStatusEffect } from './runData';

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
  na?: string
};
type TFilterRadio = {
  et?: string
  rt?: string
};
type TFilterCheckbox = TObj<Array<string>>;
type TFilter = TFilterText & TFilterRadio & TFilterCheckbox;

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
type TShareObj = {
  pathname: string,
  url: string
}
type TEntityModal = {
  card?: TCard,
  exhibit?: TExhibitObj,
  statusEffect?: TStatusEffect,
  request?: TRequestObj,
  jadeBox?: TJadeBoxObj,
  share?: TShareObj
};

type TCardMana = Array<string>;

type TModConfigs = TMod & {
  Character?: string,
  Url? : string
};

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
  TEventComponent,
  TRounds,
  TRequestObj,
  TJadeBoxObj,
  TShareObj,
  TEntityModal,
  TCardMana,
  TModConfigs
};

export {
  ErrorType
};