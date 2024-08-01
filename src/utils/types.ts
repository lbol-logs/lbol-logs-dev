type TRunList = Record<string, Record<string, string | Array<string>>>;

type TAboutComponent = { className: string, category: string, array: Array<string> };

type TRunData = Record<string, any>;

type TOption = 0 | 1 | 2 | 3;

type TAct = 0 | 1 | 2 | 3 | 4;

type TLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export type {
  TRunList,
  TAboutComponent,
  TRunData,
  TOption,
  TAct,
  TLevel
};