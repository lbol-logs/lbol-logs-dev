import { Dispatch, ReducerAction } from 'react';
import { TComponents, TObjAny, TRange16, TRange3, TRange4 } from './common';
import { TChoice } from './others';

type TRunData = {
  Version: string,
  Name?: string,
  Settings: TSettings,
  Stations: TStations,
  Acts: Array<TActObj>,
  Cards: TCardChanges,
  Exhibits: TExhibitChanges,
  Result: TResult,
  Description?: string
};

type TSettings = {
  Character: TCharacter,
  PlayerType: TPlayerType,
  HasClearBonus: boolean,
  ShowRandomResult: boolean,
  IsAutoSeed: boolean,
  Difficulty: string,
  Requests: TRequests,
  Mods?: TMods,
  Status: TStatus
};

type TCharacter = string;
type TPlayerType = 'A' | 'B';

type TRequests = Array<string>;

type TMod = {
  GUID: string,
  Name: string,
  Version: string
};
type TMods = Array<TMod>;

type TStation = {
  Type: string,
  Node: TNodeObj,
  Status: TStatus,
  Data: TData,
  Id?: string,
  Rewards?: TRewards
};
type TStations = Array<TStation>;

type TData = TObjAny;

type TRewards = {
  Money?: number,
  Cards?: Array<TCards>,
  Exhibits?: TExhibits
};

type TNodeObj = {
  Act: TAct,
  Level: TLevel,
  Y: TNodeY
};

type TAct = TRange4;
type TLevel = TRange16;

type TStatus = {
  Money: number,
  Hp: number,
  MaxHp: number,
  Power: number,
  MaxPower: number
};

type TCard = {
  Id: string,
  IsUpgraded: boolean,
  UpgradeCounter?: number
};
type TCards = Array<TCard>;
type TCardWithPrice = TCard & {
  Price: number,
  IsDiscounted?: boolean
};
type TCardsWithPrice = Array<TCardWithPrice>;

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

type TTurn = {
  Round: number
  Turn: number
  Id: string,
  Cards?: TCards,
  Intentions?: TIntentions,
  Status: TBattleStatus,
  StatusEffects: TStatusEffects
};
type TTurns = Array<TTurn>;

type TIntention = {
  Type: string
};
type TIntentionWithDamage = TIntention & {
  Damage: number,
  Times: number,
  IsAccurate: number
};
type TIntentions = Array<TIntention | TIntentionWithDamage>;

type TBattleStatus = {
  Hp: number,
  Block: number,
  Barrier: number,
  Power?: number
};

type TStatusEffect = {
  Id: string,
  Level?: number,
  Duration?: number,
  Count?: number
};
type TStatusEffects = Array<TStatusEffect>;

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

type TResult = {
  Type: string,
  Timestamp: string,
  Cards: TCards,
  Exhibits: TExhibits,
  BaseMana: string,
  ReloadTimes?: number,
  Seed?: string
};

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

enum RequestType {
  HalfDrug = 'HalfDrug',
  StartMisfortune = 'StartMisfortune'
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

enum ExhibitsEnhanceDrinkTea {
  JingzhiChaju = 'JingzhiChaju',
  DiannaoPeijian = 'DiannaoPeijian',
  HuangyouJiqiren = 'HuangyouJiqiren'
};

enum TradeStation {
  RinnosukeTrade = 'RinnosukeTrade',
  SumirekoGathering = 'SumirekoGathering'
};

enum SpecialExhibit {
  WaijieYanjing = 'WaijieYanjing',
  WaijieYouxiji = 'WaijieYouxiji',
  WaijieYanshuang = 'WaijieYanshuang',
  JingjieGanzhiyi = 'JingjieGanzhiyi'
};

type TDialogueConfigs = {
  current: string,
  currentComponents?: TObjAny,
  next: Array<string>,
  chosen: TChoice,
  props?: Array<TObjAny>,
  invalids?: Array<number>,
  befores?: TComponents,
  cards?: Array<TCards>,
  exhibits?: Array<TExhibits>
  afters?: TComponents
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
  TCardWithPrice,
  TCardsWithPrice,
  TTurns,
  TIntentionWithDamage,
  TIntentions,
  TBattleStatus,
  TStatusEffect,
  TStatusEffects,
  TExhibit,
  TExhibits,
  TCardChanges,
  TExhibitChange,
  TExhibitChanges,
  TNodeObj,
  TExhibitObj,
  TExhibitObjs,
  TBaseMana,
  TBaseManaObj,
  THolding,
  THoldings,
  THoldingAction,
  THoldingsReducer,
  THoldingChange,
  TRequests,
  TMod,
  TMods,
  TDialogueConfigs
};

export {
  RequestType,
  CardsWithUpgradeCounter,
  ExhibitsWithCounter,
  ExhibitsEnhanceDrinkTea,
  TradeStation,
  SpecialExhibit
};