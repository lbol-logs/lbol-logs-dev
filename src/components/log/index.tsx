import Header from 'components/common/header';
import useId from 'components/hooks/useId';
import useVersion from 'components/hooks/useVersion';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();
  useVersion(ver);
  useId(id);

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