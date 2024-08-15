import { TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';
import { TNodes, TNodeY } from 'utils/types/runData';

function checkForce(Nodes: TNodes) {
  const nodesY: Array<TNodeY> = [];
  Nodes.forEach(({ Y }) => (!nodesY.includes(Y)) && nodesY.push(Y));
  const force = nodesY.length !== 1 || nodesY[0] !== 0;
  return { nodesY, force };
}

function validateRunData(runData: TRunData) {
  if (!Object.keys(runData)) return false;
  else return true;
}

// TODO: remove
function validateConfigs(configs: TObjAny) {
  if (!Object.keys(configs)) return false;
  else return true;
}

function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export default copyObject;

export {
  checkForce,
  validateRunData,
  validateConfigs,
  copyObject
};