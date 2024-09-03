import { configsUrl, logsUrl } from 'configs/globals';

const cache = new Map();

function fetchData(baseUrl: string, version: string, path: string) {
  const url = `${baseUrl}/${version}/${path}.json`;
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url: string) {
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

function getRunList(version: string) {
  return fetchData(logsUrl, version, 'list');
}

function getLog(version: string, id: string) {
  return fetchData(logsUrl, version, `logs/${id}`);
}

function getConfigs(version: string, name: string) {
  return fetchData(configsUrl, version, name);
}

export {
  getRunList,
  getLog,
  getConfigs
};