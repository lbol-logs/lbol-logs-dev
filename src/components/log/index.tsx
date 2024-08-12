import Header from 'components/common/layouts/header';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import RunData from './runData';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();

  return (
    <Suspense fallback={<Loading />}>
      <Header isLog={true} />
      <main className="l-log">
        <div className="l-inner">
          <LogProvider>
            <RunData ver={ver} id={id} />
          </LogProvider>
        </div>
      </main>
    </Suspense>
  );
};

export default Log;