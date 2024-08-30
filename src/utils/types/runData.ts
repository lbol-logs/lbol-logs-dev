import { Dispatch, ReducerAction } from 'react';
import { TObj, TObjAny, TObjNumber, TObjString, TRange16, TRange3, TRange4 } from './common';

type TRunData = {
  Versions: string,
  Settings: TSettings,
  Stations: TStations,
  Acts: Array<TActObj>,
  Cards: TCardChanges,
  Exhibits: TExhibitChanges,
  Result: TResult
};

type TSettings = {
  Character: TCharacter,
  PlayerType: TPlayerType,
  HasClearBonus: boolean,
  ShowRandomResult: boolean,
  IsAutoSeed: boolean,
  Requests: TRequests,
  Difficulty: string,
  Status: TStatus
};

type TCharacter = string;
type TPlayerType = 'A' | 'B';

type TRequests = Array<string>;

type TStatus = {
  Money: number,
  Hp: number,
  MaxHp: number,
  Power: number,
  MaxPower: number
};

type TStation = {
  Type: string,
  Node: TNodeObj,
  Status: TStatus,
  Data: TData,
  Id?: string | number,
  Rewards?: TRewards
};
type TStations = Array<TStation>;

type TNodeObj = {
  Act: TAct,
  Level: TLevel,
  Y: TNodeY
};

type TAct = TRange4;

type TLevel = TRange16;

type TData = TObjAny;

type TRewards = {
  Money: number,
  Cards: Array<TCards>,
  Exhibits?: TExhibits
};

type TCard = {
  Id: string,
  IsUpgraded: boolean,
  UpgradeCounter?: number
};
type TCards = Array<TCard>;

type TExhibit = string;
type TExhibits = Array<TExhibit>;

type TBoss = string;

type TActObj = {
  Act: TAct,
  Nodes: TNodes,
  Boss?: TBoss
};

type TNode = {
  X: TNodeX,
  Y: TNodeY,
  Followers: TFollowers,
  Type: TNodeType
};
type TNodes = Array<TNode>;

type TNodeX = TLevel;
type TNodeY = TRange4;
type TNodeType = 'None' | 'Enemy' | 'EliteEnemy' | 'Supply' | 'Gap' | 'Shop' | 'Adventure' | 'Entry' | 'Select' | 'Trade' | 'Boss' | 'BattleAdvTest';

type TFollowers = [TFollower?, TFollower?, TFollower?, TFollower?];
type TFollower = TNodeY;

type TResult = {
  Type: string,
  Timestamp: string,
  Cards: TCards,
  Exhibits: TExhibits,
  BaseMana: string
};

type TChange = {
  Type: TChangeType,
  Station: number
};

type TCardChange = TCard & TChange;
type TCardChanges = Array<TCardChange>;

type TExhibitObj = {
  Id: TExhibit,
  Counter?: TRange3
};
type TExhibitObjs = Array<TExhibitObj>;

type TExhibitChange = TExhibitObj & TChange;
type TExhibitChanges = Array<TExhibitChange>;

type TChangeType = 'Add' | 'Remove' | 'Upgrade' | 'Use';

type TBaseMana = string;
type TBaseManaObj = {
  BaseMana: TBaseMana
};

type THolding = {
  Act: TAct,
  Level: TLevel,
  Cards: TCards,
  Exhibits: TExhibitObjs,
  BaseMana: TBaseMana
};
type THoldings = Array<THolding>;

type THoldingActionType = 'Card' | 'Exhibit' | 'BaseMana' | '';

type THoldingChange = {
  Type: TChangeType,
  Station: TNodeObj
};

type THoldingActionChange = (TCard | TExhibitObj | TBaseManaObj | {})
& THoldingChange;
type THoldingAction = {
  type: THoldingActionType,
  change: THoldingActionChange
};
type THoldingsReducer = Dispatch<ReducerAction<(holdings: THoldings, action: THoldingAction) => THoldings>>;

enum RequestTypes {
  HalfDrug = 'HalfDrug',
  StartMisfortune = 'StartMisfortune'
};

const eventsConvertBaseMana = {
  JunkoColorless: 'CC',
  PatchouliPhilosophy: 'P'
};

enum CardsWithUpgradeCounter {
  YuyukoSing = 'YuyukoSing'
};

enum ExhibitsWithCounter {
  GanzhuYao = 'GanzhuYao',
  ChuRenou = 'ChuRenou',
  TiangouYuyi = 'TiangouYuyi',
  Moping = 'Moping',
  Baota = 'Baota'
};

const exhibitCounters: TObj<TObjNumber> = {
  GanzhuYao: { initial: 0 },
  ChuRenou: { initial: 3 },
  TiangouYuyi: { initial: 3 },
  Moping: { initial: 3 },
  Baota: { initial: 0, final: 3 }
};

enum ExhibitsEnhanceDrinkTea {
  JingzhiChaju = 'JingzhiChaju',
  DiannaoPeijian = 'DiannaoPeijian',
  HuangyouJiqiren = 'HuangyouJiqiren'
};

enum EventsWithConvert {
  JunkoColorless = 'JunkoColorless',
  PatchouliPhilosophy = 'PatchouliPhilosophy'
};

const eventsColors: TObjString = {
  JunkoColorless: 'CC',
  PatchouliPhilosophy: 'P'
};

type TDialogueConfigs = {
  current: string,
  next: Array<string>,
  chosen: TRange3,
  props?: Array<TObjAny>,
  invalids?: Array<number>,
  cards?: Array<TCards>,
  exhibits?: Array<TExhibits>,
  tips?: Array<JSX.Element>
};

export type {
  TRunData,
  TCharacter,
  TPlayerType,
  TAct,
  TLevel,
  TActObj,
  TStations,
  TStation,
  TStatus,
  TNodes,
  TNode,
  TNodeX,
  TNodeY,
  TRewards,
  TCard,
  TCards,
  TExhibit,
  TExhibits,
  THolding,
  THoldings,
  THoldingAction,
  THoldingsReducer,
  TCardChanges,
  TExhibitChange,
  TExhibitChanges,
  TNodeObj,
  TExhibitObj,
  TExhibitObjs,
  TBaseMana,
  TBaseManaObj,
  THoldingChange,
  TRequests,
  TDialogueConfigs
};

export {
  RequestTypes,
  eventsConvertBaseMana,
  CardsWithUpgradeCounter,
  ExhibitsWithCounter,
  exhibitCounters,
  ExhibitsEnhanceDrinkTea,
  EventsWithConvert,
  eventsColors
};