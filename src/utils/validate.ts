import { TRunData } from 'utils/types/runData';
import { TObjAny } from 'utils/types/common';

function validateRunData(runData: TRunData) {
  if (!Object.keys(runData)) return false;
  else return true;
}

function validateConfigs(configs: TObjAny) {
  if (!Object.keys(configs)) return false;
  else return true;
}

export {
  validateRunData,
  validateConfigs
};