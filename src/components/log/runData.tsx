import { Suspense } from 'react';
import useVersion from 'hooks/useVersion';
import useRunData from 'hooks/useRunData';
import RunDataTemplate from './runDataTemplate';
import Loading from 'components/common/layouts/loading';

function RunData({ ver, id }: { ver: string, id: string }) {
  useVersion(ver);
  useRunData(id);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RunDataTemplate />
      </Suspense>
    </>
  );
}

export default RunData;