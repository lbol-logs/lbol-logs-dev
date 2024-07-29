import { useParams } from 'react-router-dom';

function Top() {
  const { ver } = useParams<{ ver: string }>();
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  return (
    <>
      <h1>Topページです</h1>
      <p>バージョン: {ver}</p>
    </>
  );
};

export default Top;