import { Dispatch, ReducerAction } from 'react';
import { TObjAny, TObjNumber, TRange16, TRange3, TRange4 } from './common';

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
  Station: number
};

type TCardChange = TCard & TChange;
type TCardChanges = Array<TCardChange>;

type TExhibitObj = {
  Id: TExhibit,
  Counter?: TRange3
}
type TExhibitObjs = Array<TExhibitObj>;

type TExhibitChange = TChange & TExhibitObj;
type TExhibitChanges = Array<TExhibitChange>;

type TChangeType = 'Add' | 'Remove' | 'Upgrade' | 'Use';

type THolding = {
  Act: TAct,
  Level: TLevel,
  Cards: TCards,
  Exhibits: TExhibitObjs
};
type THoldings = Array<THolding>;

type THoldingActionType = 'Cards' | 'Exhibits';
type THoldingActionChange = 
(Omit<TCardChange, 'Station'> | Omit<TExhibitChange, 'Station'>)
& {
  Station: TNodeObj
};
type THoldingAction = {
  type: THoldingActionType,
  change: THoldingActionChange
};
type THoldingsReducer = Dispatch<ReducerAction<(holdings: THoldings, action: THoldingAction) => THoldings>>;

enum ExhibitWithCounter {
  GanzhuYao,
  ChuRenou,
  TiangouYuyi,
  Moping
};

const ExhibitInitialCounter: TObjNumber = {
  GanzhuYao: 0,
  ChuRenou: 3,
  TiangouYuyi: 3,
  Moping: 3
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
  TNodeX,
  TNodeY,
  TCard,
  TCards,
  TExhibit,
  TExhibits,
  THolding,
  THoldings,
  THoldingAction,
  THoldingsReducer,
  TCardChanges,
  TExhibitChanges,
  TNodeObj,
  TExhibitObj,
  TExhibitObjs
};

export {
  ExhibitWithCounter,
  ExhibitInitialCounter
};