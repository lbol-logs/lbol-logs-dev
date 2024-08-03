type TObj = Record<string, any>;
type TRange03 = 0 | 1 | 2 | 3;
type TRange04 = 0 | 1 | 2 | 3 | 4;

type TRunList = Record<string, Record<string, string | Array<string>>>;

type TAboutComponent = { className: string, category: string, array: Array<string> };

type TRunData = TObj;

type TOption = TRange03;

type TAct = TRange04;

type TLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;


type TData = Record<string, any>;

type TStatus = {
  Money: number,
  Hp: number,
  MaxHp: number,
  Power: number,
  MaxPower: number
}

type TCard = {
  Id: string,
  IsUpgraded: boolean,
  UpgradeCounter?: number
}

type TExhibit = string;

type TRewards = {
  Money: number,
  Cards: Array<Array<TCard>>,
  Exhibits?: Array<TExhibit>
}

type TStation = {
  Type: string,
  Node: {
    Act: TAct,
    Level: TLevel
  },
  Status: TStatus,
  Data: TData,
  Id?: string | number,
  Rewards?: TRewards
};

type TStations = Array<TStation>;

type TActObj = {
  Act: TAct,
  Nodes: TNodes
};
type TNode = {
  X: TNodeX,
  Y: TNodeY,
  Followers: TFollowers,
  Type: TNodeType
};
type TNodeX = TLevel;
type TNodeY = TRange04;
type TNodeType = string; // TODO
type TNodes = Array<TNode>;
type TFollower = TNodeY;
type TFollowers = [TFollower?, TFollower?, TFollower?, TFollower?];

type TPromise = {
  status: string,
  value: TObj,
  reason: TObj,
  then: (result: TObj, error: TObj) => {}
};

export type {
  TObj,
  TRunList,
  TAboutComponent,
  TRunData,
  TOption,
  TAct,
  TLevel,
  TStations,
  TActObj,
  TNode,
  TNodeX,
  TNodeY,
  TFollower,
  TFollowers,
  TNodes,
  TPromise
};