import Header from 'components/common/header';
import { useParams } from 'react-router-dom';

function Log() {
  const { ver, id } = useParams<{ ver: string, id: string }>();
  /*
   * TODO: id取得失敗は分岐表示
   */

  return (
    <>
      <Header />
      <h1>Logページです</h1>
      <p>バージョン: {ver}</p>
      <p>ID: {id}</p>
    </>
  );
};

export default Log;