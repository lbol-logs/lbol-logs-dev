import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LogContext } from 'contexts/logContext';
import useVersion from 'hooks/useVersion';
import useRunData from 'hooks/useRunData';
import RunDataLoaded from './runDataLoaded';

function RunData({ ver, id }: { ver: string, id: string }) {
  const { t } = useTranslation();
  const { isLoading } = useContext(LogContext);

  useVersion(ver);
  useRunData(id);
  
  return (
    <main className="l-log">
      {isLoading
        ? t('loading', { ns: 'common' })
        : <RunDataLoaded />
      }
    </main>
  );
}

export default RunData;