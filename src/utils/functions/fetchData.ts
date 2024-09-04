import { configsUrl, logsUrl } from 'configs/globals';

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
  return getData(logsUrl, version, `logs/${id}`);
}

function getConfigs(version: string, name: string) {
  return getData(configsUrl, version, name);
}

export {
  getLastUpdated,
  getRunList,
  getLog,
  getConfigs
};