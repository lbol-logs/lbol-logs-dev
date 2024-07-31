const languages: Record<string, any> = {
  en: 'EN',
  ja: '日本語'
};

const namespaces: Array<string> = [
  'common',
  'run'
];

const versions: Array<string> = [
  '1.5.1'
];

const latestVersion: string = versions[0];

const baseUrl: string = process.env.PUBLIC_URL;

const dataUrl: string = 'https://ed-ev.github.io/lbol-logs-data';

type TRunList = Record<string, Record<string, string | Array<string>>>;

type TRunLog = Record<string, any>;

export {
  languages,
  namespaces,
  versions,
  latestVersion,
  baseUrl,
  dataUrl
};

export type {
  TRunList,
  TRunLog
};