import { configsUrl, gasUrl, logsUrl, modsConfigsUrl } from 'configs/globals';

const cache = new Map();

function _getData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, _fetchData(url));
  }
  return cache.get(url);
}

async function _fetchData(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.error({ error });
    return {};
  }
}

function getData(baseUrl: string, version: string, path: string) {
  const url = `${baseUrl}/${version}/${path}.json`;
  return _getData(url);
}

function getLastUpdated() {
  const url = `${logsUrl}/lastUpdated.json`;
  return _getData(url);
}

function getRunList(version: string) {
  return getData(logsUrl, version, 'list');
}

function getLog(version: string, id: string) {
  const url = getLogUrl(version, id);
  return _getData(url);
}

function getLogUrl(version: string, id: string) {
  const url = `${logsUrl}/${version}/logs/${id}.json`;
  return url;
}

function getLog2(version: string, id: string) {
  const url = getGasUrl(version, id);
  return _getData(url);
}

function getGasUrl(version: string, id: string) {
  const url = `${gasUrl}?v=${version}&id=${id}`;
  return url;
}

function getConfigs(version: string, name: string, isMods: boolean = false) {
  const url = getConfigsUrl(version, name, isMods);
  return _getData(url);
}

function getConfigsUrl(version: string, name: string, isMods: boolean = false) {
  const baseUrl = isMods ? modsConfigsUrl : configsUrl;
  const url = `${baseUrl}/${version}/${name}.json`;
  return url;
}

export {
  getLastUpdated,
  getRunList,
  getLog,
  getLogUrl,
  getLog2,
  getGasUrl,
  getConfigs,
  getConfigsUrl
};