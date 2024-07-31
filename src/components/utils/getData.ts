import { dataUrl } from "configs/globals";
import { VersionContext } from "contexts/versionContext";
import { useContext } from "react";

function getData(path: string, version: string) {
  const url = `${dataUrl}/${version}/${path}.json`;
  const promise = fetch(url).then(res => res.json());
  return promise;
}

function getList(version: string) {
  return getData('list', version);
}

function getLog(id: string, version: string) {
  return getData(`logs/${id}`, version);
}

function getConfig(name: string, version: string) {
  return getData(`configs/${name}`, version);
}

export {
  getList,
  getLog,
  getConfig
};