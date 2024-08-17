import { Suspense } from 'react';
import useVersion from 'hooks/useVersion';
import useRunData from 'hooks/useRunData';
import RunDataTemplate from './runDataTemplate';
import Loading from 'components/common/layouts/loading';

function RunData({ ver, id }: { ver: string, id: string }) {
  useVersion(ver);
  const [isValidRunData, redirect] = useRunData(id);
  if (!isValidRunData) return redirect as unknown as JSX.Element;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RunDataTemplate />
      </Suspense>
    </>
  );
}

export default RunData;