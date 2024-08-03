import { Suspense, useContext, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { LogContext } from 'contexts/logContext';
import useVersion from 'hooks/useVersion';
import useRunData from 'hooks/useRunData';
import RunDataLoaded from './runDataLoaded';
import Loading from 'components/common/loading';

function RunData({ ver, id }: { ver: string, id: string }) {
  const { t } = useTranslation();
  const { isLoading } = useContext(LogContext);

  useVersion(ver);
  useRunData(id);
  
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RunDataLoaded />
      </Suspense>
    </>
  );
}

export default RunData;