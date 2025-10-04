import { ConfigsData } from 'utils/classes/Configs';
import { AsideType, TConfigsData, TObj, TObjString } from 'utils/types/common';
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
const fallbackLanguage = {
  'zh-cmn-Hant': ['zh-cmn-Hans', 'en'],
  default: ['en']
};

const namespaces: Array<string> = [
  'spellcards',
  'cards',
  'exhibits',
  'units',
  'statusEffects',
  'keywords',
  'common',
  'site',
  'runList',
  'log',
  'events',
  'dialogues',
  'gap',
  'requests',
  'jadeBoxes'
];
const modsNamespaces: Array<string> = [
  'spellcards',
  'cards',
  'exhibits',
  'units',
  'statusEffects'
];

const versions: Array<string> = [
  '1.7.2',
  '1.7.1',
  '1.7.0',
  '1.6.1',
  '1.6.0',
  '1.5.1'
];

const tempVersion = '1.8.0';
// const tempVersion = '';
if (tempVersion) versions.unshift('temp');

const latestVersion: string = versions[0];
const latestVersionWips: TObj<boolean> = {
  // islatestVersionWip: true,
  // islatestVersionModsWip: true
};


const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const baseUrl: string = process.env.PUBLIC_URL;

const assetsDir: string = 'assets';
const assetsUrl: string = `${baseUrl}/${assetsDir}`

const modsDirDev = 'mods/docs';
const modsDir: string = isDev ? modsDirDev : 'mods';
const modsUrl: string = `${baseUrl}/${modsDir}`;

const imagesUrl: string = `${assetsUrl}/images`;
const configsUrl: string = `${assetsUrl}/configs`;

const modsImagesUrl: string = `${modsUrl}/images`;
const modsConfigsUrl: string = `${modsUrl}/configs`;

const logsUrl: string = `${baseUrl}/logs`;

const gameUrl: string = 'https://store.steampowered.com/app/1140150/';
const modUrl: string = 'https://thunderstore.io/c/touhou-lost-branch-of-legend/p/ed_ev/LBoL_Run_Logger/';
const gasUrl: string = 'https://script.google.com/macros/s/AKfycbxQZf9xkxJX-YNYxXAjssmqT2-HFmH1EPZ6bjbcoz1RxvfWdHoP1eWC8D4XiQkIpmLvbw/exec';

const logUpdate = 10;

const GA4_MEASUREMENT_ID = 'G-8Q07V7QP73';

const iconSize = 36;

const cardSize = {
  width: 220,
  height: 152
};

const resultSizes = {
  bg: 292,
  avatar: 146,
  height: 100
};

const logsPerPage = 30;

const scrollTolerance = 300;

const defaultHoldingsHeight = 144;
const defaultHoldingsWidth = 801;
const asideHoldingsthreshold = 1536;
const defaultAsideHoldings = AsideType.right;

const descriptionMaxLength = 300;

const modsThreshold = 6;

const configsData: TConfigsData = {} as TConfigsData;
const CONFIGS_DATA: ConfigsData = new ConfigsData(configsData, false);

const modsConfigsData: TConfigsData = {} as TConfigsData;
const MODS_CONFIGS_DATA: ConfigsData = new ConfigsData(modsConfigsData, true);

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

const whitelistDomains: Array<string> = [
  'https://lbol-logs.github.io/',
  'https://www.youtube.com/',
  'https://youtu.be/',
  'https://docs.google.com/'
];

export {
  languages,
  fallbackLanguage,
  namespaces,
  modsNamespaces,
  versions,
  tempVersion,
  latestVersion,
  latestVersionWips,
  isDev,
  baseUrl,
  assetsDir,
  modsDirDev,
  imagesUrl,
  configsUrl,
  modsImagesUrl,
  modsConfigsUrl,
  logsUrl,
  gameUrl,
  modUrl,
  gasUrl,
  logUpdate,
  GA4_MEASUREMENT_ID,
  iconSize,
  cardSize,
  resultSizes,
  logsPerPage,
  scrollTolerance,
  defaultHoldingsHeight,
  defaultHoldingsWidth,
  asideHoldingsthreshold,
  defaultAsideHoldings,
  descriptionMaxLength,
  modsThreshold,
  CONFIGS_DATA,
  configsData,
  MODS_CONFIGS_DATA,
  modsConfigsData,
  enemiesShowDetails,
  resultTypes,
  defaultRunData,
  whitelistDomains
};