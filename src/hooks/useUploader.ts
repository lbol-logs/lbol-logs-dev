import { gasUrl, versions } from 'configs/globals';
import { useCallback } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { getLogUrl } from 'utils/functions/fetchData';
import { getLogLink, validateRunData } from 'utils/functions/helpers';
import { TDispatch, TObjAny } from 'utils/types/common';
import { ErrorType } from 'utils/types/others';
import { TRunData } from 'utils/types/runData';

function useUploader(setSearchParams: SetURLSearchParams, setIsUploading: TDispatch<boolean>) {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => reset();

      reader.onerror = () => reset();

      reader.onload = async () => {
        reset();
        setIsUploading(true);
        const text = reader.result as string;
        const { error, runData, Version, Id } = validateUpload(text);
        if (error) {
          setSearchParams(error, { replace: true });
        }
        else {
          const version = Version as string;
          const id = Id as string;
          const { error, isOnGithub, url } = await checkGithub(version, id);
          if (error) {
            setSearchParams(error, { replace: true });
          }
          else {
            if (isOnGithub) {
              const error = {
                error: ErrorType.alreadyExist.toString(),
                url: encodeURIComponent(url)
              };
              setSearchParams(error, { replace: true });
            }
            else {
              const { error, isNew, url } = await checkGas({ version, id, runData: runData as TRunData });
              const _url = url && encodeURIComponent(url);
              if (error) {
                if (!isNew) Object.assign(error, { url: _url });
                setSearchParams(error, { replace: true });
              }
              else {
                setSearchParams({ success: _url as string }, { replace: true });
              }
            }
          }
        }
        setIsUploading(false);
      };

      reader.readAsText(file);
    });    
  }, []);

  function reset() {
    setIsUploading(false);
    setSearchParams({}, { replace: true });
  }

  function validateUpload(text: string) {
    let error: TObjAny | undefined, runData, Version, Id;

    try {
      runData = JSON.parse(text) as TRunData;

      try {
        if (!validateRunData(runData)) {
          error = {
            error: ErrorType.invalidFile.toString()
          };
        }
        else {
          ({ Version } = runData);
          if (!versions.includes(Version)) {
            error = {
              error: ErrorType.invalidVersion.toString(),
              version: Version
            };
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
              error = {
                error: ErrorType.invalidFile.toString()
              };
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
        error = {
          error: ErrorType.unknownError.toString()
        };
      }
    }
    catch (_) {
      error = {
        error: ErrorType.invalidFile.toString()
      };
    }
    finally {
      return { error, runData, Version, Id };
    }
  }

  async function checkGithub(version: string, id: string) { 
    const url = getLogLink(version, id);
    let error, isOnGithub;
    try {
      const url = getLogUrl(version, id);
      const response = await fetch(url);
      const text = await response.text();
      try {
        const runData = JSON.parse(text);
        isOnGithub = validateRunData(runData);
      }
      catch (_) {
        isOnGithub = false;
      }
    }
    catch(_) {
      error = {
        error: ErrorType.unknownError.toString()
      };
    }
    finally {
      return { error, isOnGithub, url };
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
      if (!isNew) {
        error = {
          error: ErrorType.alreadyExist.toString()
        };
      }
      url = getLogLink(version, id);
    }
    catch (_) {
      error = {
        error: ErrorType.unknownError.toString()
      };
    }
    finally {
      return { error, isNew, url };
    }
  }

  return onDrop;
}

export default useUploader;