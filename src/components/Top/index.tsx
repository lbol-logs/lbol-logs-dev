import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import About from './about';
import LanguageSwitcher from 'components/Common/languageSwitcher';

function Top() {
  const { ver } = useParams<{ ver: string }>();
  const { t } = useTranslation();
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