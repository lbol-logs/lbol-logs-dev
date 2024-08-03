import Header from 'components/common/header';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import RunData from './runData';
import { Suspense } from 'react';
import Loading from 'components/common/loading';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();

  return (
    <Suspense fallback={<Loading />}>
      <Header isLog={true} />
      <main className="l-log">
        <div className="l-inner">
          <LogProvider>
            <h1>Logページです</h1>
            <p>バージョン: {ver}</p>
            <p>ID: {id}</p>
            <RunData ver={ver} id={id} />
          </LogProvider>
        </div>
      </main>
    </Suspense>
  );
};

export default Log;