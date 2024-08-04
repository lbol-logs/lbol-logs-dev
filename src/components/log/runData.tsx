import { Suspense } from 'react';
import useVersion from 'hooks/useVersion';
import useRunData from 'hooks/useRunData';
import RunDataLoaded from './runDataLoaded';
import Loading from 'components/common/loading';

function RunData({ ver, id }: { ver: string, id: string }) {

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