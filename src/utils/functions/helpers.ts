import { toggleCheckedClassName } from 'components/top/filters/filter';
import { TObjAny } from 'utils/types/common';
import { TRunData } from 'utils/types/runData';
import { TNodes, TNodeY } from 'utils/types/runData';

function checkForce(Nodes: TNodes) {
  const nodesY: Array<TNodeY> = [];
  Nodes.forEach(({ Y }) => (!nodesY.includes(Y)) && nodesY.push(Y));
  const force = nodesY.length !== 1 || nodesY[0] !== 0;
  return { nodesY, force };
}

function validateRunData(runData: TRunData) {
  if (!Object.keys(runData).length) return false;
  else return true;
}

function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function filterObject<T extends TObjAny>(o: T, callback: Function): T {
  return Object.keys(o)
    .filter(key => callback(o[key]))
    .reduce((_o: TObjAny, key: string) => (_o[key] = o[key], _o), {} as T) as T;
}

function compareArrays(array1: Array<string>, array2: Array<string>) {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

function getLength(obj: Object) {
  return Object.keys(obj).length;
}

function toggleIsChecked(isChecked: boolean) {
  return isChecked ? toggleCheckedClassName : '';
}

export {
  checkForce,
  validateRunData,
  copyObject,
  filterObject,
  compareArrays,
  getLength,
  toggleIsChecked
};