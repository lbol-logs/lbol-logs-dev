import { TRunData } from 'utils/types/runData';

function validateRunData(runData: TRunData) {
  if (!Object.keys(runData)) return false;
  return true;
}

export default validateRunData;