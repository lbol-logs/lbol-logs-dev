import { useParams } from 'react-router-dom';

function Log() {
  const { ver, id } = useParams<{ ver: string, id: string }>();
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   * 
   * id取得失敗は分岐表示
   */

  return (
    <>
      <h1>Logページです</h1>
      <p>バージョン: {ver}</p>
      <p>ID: {id}</p>
    </>
  );
};

export default Log;