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

function getLength(obj: Object) {
  return Object.keys(obj).length;
}

function toggleIsChecked(isChecked: boolean) {
  return isChecked ? toggleCheckedClassName : '';
}

export default copyObject;

export {
  checkForce,
  validateRunData,
  copyObject,
  getLength,
  toggleIsChecked
};