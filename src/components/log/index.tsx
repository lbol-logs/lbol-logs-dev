import Header from 'components/common/header';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import RunData from './runData';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();

  return (
    <>
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
    </>
  );
};

export default Log;