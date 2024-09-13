import { TObj, TObjString } from 'utils/types/common';
import { TRunData } from 'utils/types/runData';

const languages: TObj<TObjString> = {
  en: {
    label: 'EN',
    discord: 'https://discord.com/channels/1040229874176098344/1267772366054887506'
  },
  ja: {
    label: '日本語',
    discord: 'https://discord.com/channels/1040229874176098344/1267772986254163990'
  },
  'zh-cmn-Hant': {
    label: '繁中',
    discord: 'https://discord.com/channels/1040229874176098344/1282271721898115163'
  },
  'zh-cmn-Hans': {
    label: '简中',
    discord: 'https://discord.com/channels/1040229874176098344/1282271721898115163'
  }
};

const namespaces: Array<string> = [
  'common',
  'site',
  'runList',
  'log',
  'cards',
  'exhibits',
  'units',
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
const logsUrl: string = `${baseUrl}/logs`;

const gameUrl: string = 'https://store.steampowered.com/app/1140150/';
const modUrl: string = 'https://thunderstore.io/c/touhou-lost-branch-of-legend/p/ed_ev/LBoL_Run_Logger/';
const gasUrl: string = 'https://script.google.com/macros/s/AKfycbxQZf9xkxJX-YNYxXAjssmqT2-HFmH1EPZ6bjbcoz1RxvfWdHoP1eWC8D4XiQkIpmLvbw/exec';

const GA4_MEASUREMENT_ID = 'G-8Q07V7QP73';

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

const resultTypes: TObjString = {
  Failure: 'Failure',
  NormalEnd: 'Normal',
  TrueEndFail: 'Normal',
  TrueEnd: 'TrueEnd'
};

const defaultRunData = {} as TRunData;

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
  GA4_MEASUREMENT_ID,
  iconSize,
  cardSize,
  resultSizes,
  scrollTolerance,
  defaultHoldingsHeight,
  commonConfigs,
  logConfigs,
  enemiesShowDetails,
  resultTypes,
  defaultRunData
};