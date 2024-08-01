import { useState } from 'react';
import Map from 'components/log/map';
import { useTranslation } from 'react-i18next';

function RunData() {
  const [isProcessing, setIsProcessing] = useState(true);
  const { t } = useTranslation();
  
  return (
    <main className="l-log">
      {isProcessing && <div className="c-log__processing">{t('processing', { ns: 'common' })}</div>}
      <Map />
    </main>
  );
}

export default RunData;