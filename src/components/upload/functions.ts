import { gasUrl, logsUrl } from 'configs/globals';
import { TRunData } from 'utils/types/runData';

async function checkGithub(text: string) {
  const runData: TRunData = JSON.parse(text);
  const { Version, Settings, Result } = runData;
  const { Character, PlayerType, Difficulty, Requests } = Settings;
  const { Type, Timestamp, Exhibits } = Result;

  const shining = Exhibits[0];
  const key = `${Timestamp}_${Character}_${PlayerType}_${shining}_${Difficulty[0]}${Requests.length}_${Type}`;
  const id = btoa(key).replace(/==$/, '');

  const url = `${logsUrl}/${Version}/logs/${id}.json`;
  let isOnGithub;
  try {
    const response = await fetch(url);
    const json = await response.json();
    isOnGithub = Object.keys(json).length > 0;
  }
  catch(_) {
  }
  finally {
    return { isOnGithub, Version, id };
  }
}

async function checkGas({ Version, id }: { Version: string, id: string }) {
  // const isOnGas = true;
  const isOnGas = false;
  return { isOnGas };
}

export {
  checkGithub,
  checkGas
};