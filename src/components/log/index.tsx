import Header from 'components/common/header';
import useRunData from 'hooks/useRunData';
import useVersion from 'hooks/useVersion';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();
  useVersion(ver);
  useRunData(id);

  /*
   * TODO: id取得失敗は分岐表示
   */

  return (
    <>
      <Header />
      <LogProvider>
        <h1>Logページです</h1>
        <p>バージョン: {ver}</p>
        <p>ID: {id}</p>
      </LogProvider>
    </>
  );
};

export default Log;