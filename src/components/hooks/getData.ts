import { dataUrl } from "configs/globals";
import { VersionContext } from "contexts/versionContext";
import { useContext } from "react";

function useData(ver: string, path: string) {
  const { version } = useContext(VersionContext);
  const url = `${dataUrl}/${version}/${path}.json`;
  const promise = fetch(url).then(res => res.json());
  return promise;
}

function useList(version: string) {
  return useData(version, 'list');
}

function useLog(version: string, id: string) {
  return useData(version, `logs/${id}`);
}

function useConfig(version: string, name: string) {
  return useData(version, `configs/${name}`);
}

export {
  useList,
  useLog,
  useConfig
};