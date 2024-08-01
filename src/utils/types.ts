type TRunList = Record<string, Record<string, string | Array<string>>>;

type TAboutComponent = { className: string, category: string, array: Array<string> };

type TRunData = Record<string, any>;

type OptionIndices = 0 | 1 | 2 | 3;

export type {
  TRunList,
  TAboutComponent,
  TRunData
};