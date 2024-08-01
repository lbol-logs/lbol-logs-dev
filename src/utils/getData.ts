import { dataUrl } from 'configs/globals';

function getData(version: string, path: string) {
  const url = `${dataUrl}/${version}/${path}.json`;
  const promise = fetch(url).then(res => res.json());
  return promise;
}

function getList(version: string) {
  return getData(version, 'list');
}

function getLog(version: string, id: string) {
  return getData(version, `logs/${id}`);
}

function getConfig(version: string, name: string) {
  return getData(version, `configs/${name}`);
}

export {
  getList,
  getLog,
  getConfig
};