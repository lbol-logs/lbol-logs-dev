import { useTranslation, Trans } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  return (
    <>
      <Trans
        i18nKey="about"
        ns='common'
        components={{ a: <a href="https://store.steampowered.com/app/1140150/"></a> }}
      />
    </>
  );
};

export default About;