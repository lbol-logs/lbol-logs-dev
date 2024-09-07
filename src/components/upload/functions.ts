import { logsUrl } from 'configs/globals';
import { TRunData } from 'utils/types/runData';

async function checkGithub(text: string) {
  const runData: TRunData = JSON.parse(text);
  const { Version, Settings, Result } = runData;
  const { Character, PlayerType, Difficulty, Requests } = Settings;
  const { Type, Timestamp, Exhibits } = Result;

  const shining = Exhibits[0];
  const key = `${Timestamp}_${Character}_${PlayerType}_${shining}_${Difficulty[0]}${Requests.length}_${Type}`;
  const id = btoa(key);

  const url = `${logsUrl}/${Version}/logs/${id}.json`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const isOnGithub = Object.keys(json).length > 0;
    return { isOnGithub, Version, id };
  }
  catch(_) {
    return {};
  }
}

export {
  checkGithub
};