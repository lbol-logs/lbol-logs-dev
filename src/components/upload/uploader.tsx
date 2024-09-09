import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useUploader from 'hooks/useUploader';
import { defaultRunData } from 'configs/globals';
import { getResultData, validateRunData } from 'utils/functions/helpers';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import useVersion from 'hooks/useVersion';

function Uploader() {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [previewData, setPreviewData] = useState(defaultRunData);
  const [searchParams, setSearchParams] = useSearchParams();

  const { onDrop, upload, reset } = useUploader(setSearchParams, setIsUploading, previewData, setPreviewData);

  useVersion();

  const options = {
    onDrop,
    accept: {
      'application/json': ['.json']
    }
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone(options);

  const className = useMemo(() => {
    let className = 'p-file-zone ';
    if (isFocused) className += 'p-file-zone--focused';
    else if (isDragAccept) className += 'p-file-zone--accept';
    else if (isDragReject) className += 'p-file-zone--reject';

    return className;
  }, [isFocused, isDragAccept, isDragReject]);

  let preview = null;
  let processing = null;
  let buttons = null;

  const isValidRunData = validateRunData(previewData);
  const hasError = searchParams.get('error');

  if (isValidRunData) {
    preview = (
      <div className="p-upload__preview">
        <ResultWidget resultData={getResultData(previewData)} />
        <RequestsWidget requests={previewData.Settings.Requests} />
      </div>
    );
  }

  if (isUploading) {
    buttons = (
      <div className="p-upload__buttons">
        {(isValidRunData && !hasError) && <button className="p-upload__button p-upload__button--upload" onClick={upload}>{t('upload', { ns: 'site' })}</button>}
        <button className="p-upload__button p-upload__button--reset" onClick={reset}>{t('reset', { ns: 'runList' })}</button>
      </div>
    );
  }

  const isProcessing = isValidRunData && !isUploading;
  if (isProcessing) {
    processing = (
      <p className="p-upload__processing">{t('processing', { ns: 'common' })}</p>
    )
  }

  return (
    <>
      {preview}
      {processing}
      {buttons}
      <div className={`p-file ${(isUploading || isProcessing) ? 'p-file--uploading' : ''}`}>
        <div {...getRootProps({ className })}>
          <input {...getInputProps()} />
          <p>
            <Trans
              i18nKey="file"
              ns="site"
            />
          </p>
        </div>
      </div>
    </>
  );
}

export default Uploader;