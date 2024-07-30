
import Header from 'components/common/header';
import About from 'components/top/about';
import CheckVersion from 'components/utils/checkVersion';
import { defaultVersion } from 'configs/globals';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

function Top() {  
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  const { ver = defaultVersion } = useParams<{ ver: string }>();
  CheckVersion(ver);

  return (
    <>
      <Header />
      <>
        <h1>Topページです</h1>
        <About />
      </>
    </>
  );
};

export default Top;