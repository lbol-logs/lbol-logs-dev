import { gasUrl, versions } from 'configs/globals';
import { useCallback } from 'react';
import { NavigateFunction, SetURLSearchParams } from 'react-router-dom';
import { getGasUrl, getLogUrl } from 'utils/functions/fetchData';
import { validateRunData } from 'utils/functions/helpers';
import { TRunData } from 'utils/types/runData';

enum Error {
  invalidFile = 'invalidFile',
  invalidVersion = 'invalidVersion',
  alreadyExist = 'alreadyExist',
  unknownError = 'unknownError'
};

function useUploader(setSearchParams: SetURLSearchParams) {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log('onabort');
        reset();
      };

      reader.onerror = () => {
        console.log('onerror');
        reset();
      };

      reader.onload = async () => {
        const text = reader.result as string;
        const runData = JSON.parse(text) as TRunData;
        const { error, Version, Id } = validateUpload(runData);
        if (error) {
          setSearchParams({ error: error.toString() }, { replace: true });
          return;
        }

        const version = Version as string;
        const id = Id as string;
        const { isOnGithub, url } = await checkGithub(version, id);
        if (isOnGithub) {
          const o = {
            error: Error.alreadyExist.toString(),
            url: encodeURIComponent(url)
          };
          setSearchParams(o, { replace: true });
        }
        else {
          const { error, isNew, url } = await checkGas({ version, id, runData });
          const _url = url && encodeURIComponent(url);
          if (error) {
            const o = { error: error.toString() };
            if (!isNew) Object.assign(o, { url: _url });
            setSearchParams(o, { replace: true });
            return;
          }

          setSearchParams({ success: _url as string }, { replace: true });
        }
      };

      reader.readAsText(file);
    });    
  }, []);

  function reset() {
    setSearchParams({}, { replace: true });
  }

  function validateUpload(runData: TRunData) {
    let error, Version, Id;
    try {
      if (!validateRunData(runData)) {
        error = Error.invalidFile;
      }
      else {
        ({ Version } = runData);
        if (!versions.includes(Version)) {
          error = Error.invalidVersion;
        }
        else {
          const { Settings, Result } = runData;
          const { Character, PlayerType, Difficulty, Requests } = Settings;
          const { Type, Timestamp, Exhibits } = Result;

          const array = [
            Character,
            PlayerType,
            Difficulty,
            Requests,
            Type,
            Timestamp,
            Exhibits
          ] as Array<unknown>;
          if (array.includes(undefined)) {
            error = Error.invalidFile;
          }
          else {
            const shining = Exhibits[0];
            const key = [
              Timestamp.replace(/:/g, '-'),
              Character,
              PlayerType,
              shining,
              Difficulty[0] + Requests.length,
              Type
            ].join('_');
            Id = encodeURIComponent(key);
          }
        }
      }
    }
    catch (_) {
      error = Error.unknownError;
    }
    finally {
      return { error, Version, Id };
    }
  }

  async function checkGithub(version: string, id: string) { 
    const url = getLogUrl(version, id);
    let isOnGithub;
    try {
      const response = await fetch(url);
      const runData = await response.json();
      isOnGithub = validateRunData(runData);
    }
    catch(_) {
    }
    finally {
      return { isOnGithub, url };
    }
  }
  
  async function checkGas({ version, id, runData }: { version: string, id: string, runData: TRunData }) {
    let error, isNew, url;
    const options = {
      method: 'POST',
      body: JSON.stringify(runData)
    };
    try {
      const response = await fetch(gasUrl, options);
      const json = await response.json();
      ({ isNew } = json);
      if (!isNew) error = Error.alreadyExist;
      url = getLogUrl(version, id);
    }
    catch (_) {
      error = Error.unknownError;
    }
    finally {
      return { error, isNew, url };
    }
  }

  return onDrop;
}

export default useUploader;