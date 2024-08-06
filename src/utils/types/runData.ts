import { TObjAny, TRange16, TRange3, TRange4 } from './common';

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
  Character: string,
  PlayerType: TPlayerType,
  HasClearBonus: boolean,
  ShowRandomResult: boolean,
  IsAutoSeed: boolean,
  Requests: TRequests,
  Difficulty: string,
  Status: TStatus
};

type TPlayerType = 'A' | 'B';

type TRequests = Array<string>;

type TStatus = {
  Money: number,
  Hp: number,
  MaxHp: number,
  Power: number,
  MaxPower: number
};

type TStations = Array<TStation>;

type TStation = {
  Type: string,
  Node: TNodeObj,
  Status: TStatus,
  Data: TData,
  Id?: string | number,
  Rewards?: TRewards
};

type TNodeObj = {
  Act: TAct,
  Level: TLevel
};

type TAct = TRange4;

type TLevel = TRange16;

type TData = TObjAny;

type TRewards = {
  Money: number,
  Cards: Array<TCards>,
  Exhibits?: Array<TExhibit>
};

type TCard = {
  Id: string,
  IsUpgraded: boolean,
  UpgradeCounter?: number
};
type TCards = Array<TCard>;

type TExhibit = string;
type TExhibits = Array<TExhibit>;

type TActObj = {
  Act: TAct,
  Nodes: TNodes
};

type TNodes = Array<TNode>;

type TNode = {
  X: TNodeX,
  Y: TNodeY,
  Followers: TFollowers,
  Type: TNodeType
};

type TNodeX = TLevel;
type TNodeY = TRange4;
type TNodeType = 'None' | 'Enemy' | 'EliteEnemy' | 'Supply' | 'Gap' | 'Shop' | 'Adventure' | 'Entry' | 'Select' | 'Trade' | 'Boss' | 'BattleAdvTest';

type TFollowers = [TFollower?, TFollower?, TFollower?, TFollower?];
type TFollower = TNodeY;

type TResult = {
  Type: string,
  Timestamp: string,
  Cards: TCards,
  Exhibits: TExhibits
};

type TChange = {
  Type: TChangeType,
  Node: TNodeObj
};

type TCardChange = TCard & TChange;
type TCardChanges = Array<TCardChange>;

type TExhibitChange = TChange & {
  Id: string,
  Counter?: TRange3
};
type TExhibitChanges = Array<TExhibitChange>;

type TChangeType = 'Add' | 'Remove' | 'Upgrade' | 'Use';

type THolding = {
  Act: TAct,
  Level: TLevel,
  Cards: TCards,
  Exhibits: TExhibits
};
type THoldings = Array<THolding>;

export type {
  TRunData,
  TAct,
  TLevel,
  TActObj,
  TStations,
  TStation,
  TStatus,
  TNodes,
  TNodeX,
  TNodeY,
  TCard,
  TCards,
  TExhibit,
  TExhibits,
  THolding,
  THoldings,
  TCardChanges,
  TExhibitChanges
};