import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { languages } from 'configs/globals';

function About() {
  const { t } = useTranslation();
  const modUrl = `https://github.com/ed-ev/lbol-runLogger/blob/master/README${i18next.language === Object.keys(languages)[0] ? '' : '-' + i18next.language}.md`;
  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  const socials = t("socials", { returnObjects: true });
  console.log(socials);

  return (
    <>
      <p>
        <Trans
          i18nKey="underConstruction"
          ns="common"
        />
      </p>
      <p>
        <Trans
          i18nKey="about"
          ns="common"
          components={{
            steam: <a href="https://store.steampowered.com/app/1140150/">steam</a>,
            mod: <a href={modUrl}>mod</a>
          }}
        />
      </p>
    </>
  );
};

export default About;