import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useUploader from 'hooks/useUploader';

function Uploader() {
  useTranslation();
  const [_, setSearchParams] = useSearchParams();

  const onDrop = useUploader(setSearchParams);

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
    let className = 'p-file ';
    if (isFocused) className += 'p-file--focused';
    else if (isDragAccept) className += 'p-file--accept';
    else if (isDragReject) className += 'p-file--reject';
    
    return className;
  }, [isFocused, isDragAccept, isDragReject]);

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      <p>
        <Trans
          i18nKey="file"
          ns="site"
        />
      </p>
    </div>
  )
}

export default Uploader;