import { TObjString } from 'utils/types/common';
import { TAct } from 'utils/types/runData';

const languages: TObjString = {
  en: 'EN',
  ja: '日本語'
};

const namespaces: Array<string> = [
  'common',
  'run',
  'log'
];

const versions: Array<string> = [
  '1.5.1'
];

const latestVersion: string = versions[0];

const baseUrl: string = process.env.PUBLIC_URL;

const imageUrl: string = `${baseUrl}/images`;

const dataUrl: string = 'https://ed-ev.github.io/lbol-logs-data';

const iconSize = 40;

const scrollTolerance = 50;

const scrollHandlerCache = new Map<TAct, EventListener>();

export {
  languages,
  namespaces,
  versions,
  latestVersion,
  baseUrl,
  imageUrl,
  dataUrl,
  iconSize,
  scrollTolerance,
  scrollHandlerCache
};