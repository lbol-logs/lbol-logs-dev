import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  const modUrl = `https://github.com/ed-ev/lbol-runLogger/blob/master/README${i18next.language === 'en' ? '' : '-' + i18next.language}.md`;
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  return (
    <>
      {t('underConstruction', { ns: 'common' })}
      <Trans
        i18nKey="about"
        ns='common'
        components={{
          steam: <a href="https://store.steampowered.com/app/1140150/"></a>,
          mod: <a href={modUrl}></a>
        }}
      />
    </>
  );
};

export default About;