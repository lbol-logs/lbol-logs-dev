import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogContext } from 'contexts/logContext';
import RunDataTemplate from 'components/log/runDataTemplate';

function RunDataProcessing() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { t } = useTranslation();
  const { act, setAct } = useContext(LogContext);
  
  useEffect(() => {
    setAct(1);
    setIsProcessing(false);
  }, [setIsProcessing, setAct]);
  
  return (
    <>
      {isProcessing && <div className="c-log__processing">{t('processing', { ns: 'common' })}</div>}
      {act === 0
        ? 'summary'
        : <RunDataTemplate />
      }
    </>
  );
}

export default RunDataProcessing;