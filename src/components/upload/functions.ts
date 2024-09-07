import { gasUrl } from 'configs/globals';
import { cache, getGasUrl, getLogUrl } from 'utils/functions/fetchData';
import { validateRunData } from 'utils/functions/helpers';
import { TRunData } from 'utils/types/runData';

async function checkGithub(runData: TRunData) {
  const { Version, Settings, Result } = runData;
  const { Character, PlayerType, Difficulty, Requests } = Settings;
  const { Type, Timestamp, Exhibits } = Result;

  const shining = Exhibits[0];
  const key = [
    Timestamp.replace(/:/g, '-'),
    Character,
    PlayerType,
    shining,
    Difficulty[0],
    Requests.length,
    Type
  ].join('_');
  const id = encodeURIComponent(key);

  const url = getLogUrl(Version, id);
  let isOnGithub;
  try {
    const response = await fetch(url);
    const runData = await response.json();
    isOnGithub = validateRunData(runData);
    if (isOnGithub) setMap(url, runData);
  }
  catch(_) {
  }
  finally {
    return { isOnGithub, Version, id };
  }
}

async function checkGas({ Version, id, runData }: { Version: string, id: string, runData: TRunData }) {
  const options = {
    method: 'POST',
    body: JSON.stringify(runData)
  };
  await fetch(gasUrl, options);
  const url = getGasUrl(Version, id);
  setMap(url, runData);
}

function setMap(url: string, runData: TRunData) {
  const data = new Promise(resolve => {
    setTimeout(() => {
      resolve(runData);
    }, 0);
  });
  cache.set(url, data);
}

export {
  checkGithub,
  checkGas
};