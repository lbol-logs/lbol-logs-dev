import { TObj, TObjString } from 'utils/types/common';

const languages: TObj<TObjString> = {
  en: {
    label: 'EN',
    lang: 'en'
  },
  ja: {
    label: '日本語',
    lang: 'ja'
  },
  zh: {
    label: '繁中',
    lang: 'zh-cmn-Hant'
  }
};

const namespaces: Array<string> = [
  'common',
  'run',
  'log',
  'cards',
  'exhibits',
  'enemies',
  'events',
  // 'test/a'
];

const versions: Array<string> = [
  '1.5.1'
];

const latestVersion: string = versions[0];

const baseUrl: string = process.env.PUBLIC_URL;

const imageUrl: string = `${baseUrl}/images`;

const dataUrl: string = 'https://ed-ev.github.io/lbol-logs-data';

const iconSize = 36;

const cardSize = {
  width: 144,
  height: 40
};

const resultSizes = {
  bg: 292,
  avatar: 146,
  height: 100
};

const scrollTolerance = 50;

const defaultHoldingsHeight = 144;

const configs: Array<string> = [
  'cards',
  'exhibits',
  'enemyGroups'
];

export {
  languages,
  namespaces,
  versions,
  latestVersion,
  baseUrl,
  imageUrl,
  dataUrl,
  iconSize,
  cardSize,
  resultSizes,
  scrollTolerance,
  defaultHoldingsHeight,
  requestsList,
  configs
};