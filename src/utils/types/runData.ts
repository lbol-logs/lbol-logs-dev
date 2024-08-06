import { TObjAny, TRange16, TRange3, TRange4 } from './common';

type TRunData = {
  Versions: string,
  Settings: TSettings,
  Stations: TStations,
  Acts: Array<TActObj>,
  Cards?: Array<TCardChange>,
  Exhibits?: Array<TExhibitChange>,
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
  Cards: Array<Array<TCard>>,
  Exhibits?: Array<TExhibit>
};

type TCard = {
  Id: string,
  IsUpgraded: boolean,
  UpgradeCounter?: number
};

type TExhibit = string;

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
};

type TChange = {
  Type: TChangeType,
  Node: TNodeObj
};

type TCardChange = TCard & TChange;

type TExhibitChange = TChange & {
  Id: string,
  Counter?: TRange3
};

type TChangeType = 'Add' | 'Remove' | 'Upgrade' | 'Use';

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
  TNodeY
};