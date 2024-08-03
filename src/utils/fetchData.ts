import { dataUrl } from 'configs/globals';

const cache = new Map();

function fetchData(version: string, path: string) {
  const url = `${dataUrl}/${version}/${path}.json`;
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

function getList(version: string) {
  return fetchData(version, 'list');
}

function getLog(version: string, id: string) {
  return fetchData(version, `logs/${id}`);
}

function getConfig(version: string, name: string) {
  return fetchData(version, `configs/${name}`);
}

export {
  getList,
  getLog,
  getConfig
};