import { useParams } from 'react-router-dom';
import i18next from 'i18next';
import { Trans } from 'react-i18next';

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
      <Trans
        i18nKey="about"
        ns='common'
        components={{ l: <a href="https://store.steampowered.com/app/1140150/">a</a> }}
      />
    </>
  );
};

export default Top;