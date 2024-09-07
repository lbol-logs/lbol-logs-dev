import { TObj, TObjString } from 'utils/types/common';

const languages: TObj<TObjString> = {
  en: {
    label: 'EN',
    lang: 'en',
    discord: 'https://discord.com/channels/1040229874176098344/1267772366054887506'
  },
  ja: {
    label: '日本語',
    lang: 'ja',
    discord: 'https://discord.com/channels/1040229874176098344/1267772986254163990'
  },
  // TODO
  // zh: {
  //   label: '繁中',
  //   lang: 'zh-cmn-Hant',
  //   discord: ''
  // }
};

const namespaces: Array<string> = [
  'common',
  'site',
  'runList',
  'log',
  'cards',
  'exhibits',
  'enemies',
  'events',
  'dialogues',
  'gap',
  'statusEffects'
];

const versions: Array<string> = [
  '1.5.1'
];

const latestVersion: string = versions[0];

const baseUrl: string = process.env.PUBLIC_URL;

const assetsUrl: string = `${baseUrl}/assets`;

const imagesUrl: string = `${assetsUrl}/images`;

const configsUrl: string = `${assetsUrl}/configs`;

const logsUrl: string = `${baseUrl}/logs`

const gameUrl: string = 'https://store.steampowered.com/app/1140150/';

const modUrl: string = 'https://thunderstore.io/c/touhou-lost-branch-of-legend/p/ed_ev/LBoL_Run_Logger/';

const gasUrl: string = 'https://script.google.com/macros/s/AKfycbxQZf9xkxJX-YNYxXAjssmqT2-HFmH1EPZ6bjbcoz1RxvfWdHoP1eWC8D4XiQkIpmLvbw/exec';

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

const commonConfigs: Array<string> = [
  'characters',
  'requests',
  'exhibits'
];

const logConfigs: Array<string> = [
  'cards',
  'enemyGroups',
  'dialogues',
  'gap',
  'events'
];

const enemiesShowDetails: Array<string> = [
  'Seija'
];

const dummyExhibit: string = 'KongZhanpinhe';

export {
  languages,
  namespaces,
  versions,
  latestVersion,
  baseUrl,
  imagesUrl,
  configsUrl,
  logsUrl,
  gameUrl,
  modUrl,
  gasUrl,
  iconSize,
  cardSize,
  resultSizes,
  scrollTolerance,
  defaultHoldingsHeight,
  commonConfigs,
  logConfigs,
  enemiesShowDetails,
  dummyExhibit
};