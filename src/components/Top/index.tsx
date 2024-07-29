import { useParams } from 'react-router-dom';
import About from './about';
import LanguageSwitcher from 'components/Common/languageSwitcher';

function Top() {
  const { ver } = useParams<{ ver: string }>();
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  return (
    <>
      <LanguageSwitcher />
      <h1>Topページです</h1>
      <p>バージョン: {ver}</p>
      <About />
    </>
  );
};

export default Top;