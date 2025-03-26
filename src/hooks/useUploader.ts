import { defaultRunData, gasUrl, tempVersion, versions } from 'configs/globals';
import { useCallback } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { getLogUrl } from 'utils/functions/fetchData';
import { getLogLink, validateRunData } from 'utils/functions/helpers';
import { TDispatch, TObjString } from 'utils/types/common';
import { ErrorType } from 'utils/types/others';
import { TRunData } from 'utils/types/runData';

function useUploader(setSearchParams: SetURLSearchParams, setIsUploading: TDispatch<boolean>, previewData: TRunData, setPreviewData: TDispatch<TRunData>) {
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => reset();

      reader.onerror = () => reset();

      reader.onload = () => {
        reset();
        setIsUploading(true);
        const text = reader.result as string;
        const error = validateFile(text);
        if (error) {
          setSearchParams(error as TObjString, { replace: true });
          return;
        }
      };
      reader.readAsText(file);
    });
  }, []);

  async function upload() {
    setIsUploading(false);
    await tryUpload();
  }

  function reset() {
    setIsUploading(false);
    setPreviewData(defaultRunData);
    setSearchParams({}, { replace: true });
  }

  async function tryUpload() {
    const runData = getRunData(previewData);
    const { Version } = runData;
    const version = isTempVersion(Version) ? 'temp' : parseVersion(Version);
    const id = getId(runData);

    {
      const { error, isOnGithub, url } = await checkGithub(version, id);
      if (error) {
        setSearchParams(error, { replace: true });
        return;
      }

      if (isOnGithub) {
        const error = {
          error: ErrorType.alreadyExist,
          url: encodeURIComponent(url)
        };
        setSearchParams(error, { replace: true });
        return;
      }
    }

    {
      const { error, isNew, url: _url } = await checkGas({ version, id, runData });
      const url = encodeURIComponent(_url);
      if (error) {
        if (!isNew) Object.assign(error, { url });
        setSearchParams(error, { replace: true });
      }
      else {
        setSearchParams({ success: url as string }, { replace: true });
      }
    }

    setPreviewData(defaultRunData);
  }

  function getId(runData: TRunData) {
    const { Settings, Result } = runData;
    const { Character, PlayerType, Difficulty, Requests } = Settings;
    const { Type, Timestamp, Exhibits } = Result;
    const shining = Exhibits[0];
    const key = [
      Timestamp.replace(/:/g, '-'),
      Character,
      PlayerType,
      shining,
      Difficulty[0] + Requests.length,
      Type
    ].join('_');
    const id = encodeURIComponent(key);
    return id;
  }

  function isTempVersion(version: string) {
    return tempVersion && (parseVersion(version) === tempVersion || version.startsWith('debug'));
  }

  function parseVersion(version: string) {
    return version.split('.').slice(0, 3).join('.');
  }

  function validateFile(text: string) {
    try {
      const runData = JSON.parse(text) as TRunData;

      try {
        if (!validateRunData(runData)) {
          return {
            error: ErrorType.invalidFile
          };
        }

        const { Version } = runData;
        const version = parseVersion(Version);
        if (isTempVersion(version)) {
        }
        else if (!versions.includes(version)) {
          return {
            error: ErrorType.invalidVersion,
            version
          };
        }

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
          return {
            error: ErrorType.invalidFile
          };
        }

        setPreviewData(runData);
      }
      catch (_) {
        return {
          error: ErrorType.unknownError
        };
      }
    }
    catch (_) {
      return {
        error: ErrorType.invalidFile
      };
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
        error: ErrorType.unknownError
      };
    }
    finally {
      return { error, isOnGithub, url };
    }
  }

  function getRunData(previewData: TRunData) {
    const textarea = document.querySelector('.js-textarea') as HTMLTextAreaElement;
    const Description = textarea.value.trim();
    if (Description !== '') Object.assign(previewData, { Description });
    return previewData;
  }

  async function checkGas({ version, id, runData }: { version: string, id: string, runData: TRunData }) {
    let error, isNew;
    const url = getLogLink(version, id);
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
          error: ErrorType.alreadyExist
        };
      }
    }
    catch (_) {
      error = {
        error: ErrorType.unknownError
      };
    }
    finally {
      return { error, isNew, url };
    }
  }

  return { onDrop, upload, reset };
}

export default useUploader;