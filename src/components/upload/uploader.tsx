import { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useUploader from 'hooks/useUploader';

function Uploader() {
  useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const onDrop = useUploader(setSearchParams, setIsUploading);

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

  return (
    <div className={`p-file ${isUploading ? 'p-file--uploading' : ''}`}>
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
  )
}

export default Uploader;