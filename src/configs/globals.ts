const languages: Record<string, any> = {
  en: 'EN',
  ja: '日本語'
};

const namespaces: Array<string> = [
  'common'
];

const versions: Array<string> = [
  '1.5.1',
  '1.5.0'
];

const defaultVersion: string = versions[0];

const baseUrl: string = process.env.PUBLIC_URL;

export {
  languages,
  namespaces,
  versions,
  defaultVersion,
  baseUrl
};