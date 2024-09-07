import { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trans, useTranslation } from 'react-i18next';
import { checkGithub } from './functions';
import { useNavigate } from 'react-router-dom';

function Uploader() {
  useTranslation();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {};
      reader.onerror = () => {};
      reader.onload = async () => {
        const text = reader.result as string;
        console.log(text);
        const { isOnGithub, Version, id } = await checkGithub(text);
        console.log({isOnGithub, Version, id})
        if (isOnGithub) {
          // navigate(`/${Version}/${id}/`);
          return;
        }


      };
      reader.readAsText(file);
    });    
  }, []);

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