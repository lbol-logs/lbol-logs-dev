import { useParams } from 'react-router-dom';
import About from 'components/top/about';
import LanguageSwitcher from 'components/common/languageSwitcher';
import VersionChecker from 'components/common/versionChecker';
import { defaultVersion } from 'configs/globals';

function Top() {
  const { ver = defaultVersion } = useParams<{ ver: string }>();
  
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  return (
    <>
      <LanguageSwitcher />
      <h1>Topページです</h1>
      <VersionChecker ver={ver} />
      <About />
    </>
  );
};

export default Top;