import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from './runDataTemplate';
import Summary from './summary';
import { useSearchParams } from 'react-router-dom';

function RunDataLoaded() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { t } = useTranslation();
  const { act, setAct } = useContext(LogContext);
  const { level, setLevel } = useContext(LogContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    setAct(1);
    setIsProcessing(false);
  }, [setIsProcessing, setAct]);
  
  return (
    <>
      {/* {isProcessing && <div className="c-log__processing">{t('processing', { ns: 'common' })}</div>} */}
      Act: {searchParams.get('a')}, Level: {searchParams.get('l')}
      {act === 0
        ? <Summary />
        : <RunDataTemplate />
      }
    </>
  );
}

export default RunDataLoaded;