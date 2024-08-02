type TObj = Record<string, any>;
type TRange03 = 0 | 1 | 2 | 3;
type TRange04 = 0 | 1 | 2 | 3 | 4;

type TRunList = Record<string, Record<string, string | Array<string>>>;

type TAboutComponent = { className: string, category: string, array: Array<string> };

type TRunData = TObj;

type TOption = TRange03;

type TAct = TRange04;

type TLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

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

export type {
  TRunList,
  TAboutComponent,
  TRunData,
  TOption,
  TAct,
  TLevel,
  TActObj,
  TNode,
  TNodeX,
  TNodeY,
  TFollower,
  TFollowers,
  TNodes
};