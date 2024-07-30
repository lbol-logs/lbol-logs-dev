import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { languages } from 'configs/globals';

function About() {
  const { t } = useTranslation();
  const modUrl = `https://github.com/ed-ev/lbol-runLogger/blob/master/README${i18next.language === Object.keys(languages)[0] ? '' : '-' + i18next.language}.md`;
  const discordUrl = i18next.language === Object.keys(languages)[0]
    ? 'https://discord.com/channels/1040229874176098344/1267772366054887506'
    : 'https://discord.com/channels/1040229874176098344/1267772986254163990';

  /*
   * TODO: バージョン検証
   * サポート外の例外処理
   * デフォルト値
   */

  type Categories = {
    [key: string]: Array<string>
  };

  const categories: Categories = t('roadmap.categories', { returnObjects: true });
  const done: Array<string> = t('done.value', { returnObjects: true });

  return (
    <section className="p-about">
      <p className="p-about__under-construction">
        <Trans
          i18nKey="underConstruction"
          ns="common"
        />
      </p>
      <div className="p-about__break"></div>
      <div className="p-about__roadmap c-roadmap">
        <h2 className="c-roadmap__title">{t('roadmap.keys.roadmap', { ns: 'common' })}</h2>
        {Object.entries(categories).map(([category, array]) => {
          const key = `c-roadmap-${category}`;
          return (
            <div className={key} key={key}>
              <h3 className={`${key}__title`}>{t(`roadmap.keys.${category}`, { ns: 'common' })}</h3>
              <ul className={`${key}__list`}>
                {array.map((item, i) => {
                  return (
                    <li className={`${key}__list-item`} key={`${category}${i}`}>{item}</li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="p-about__done c-done">
        <h2 className="c-done__title">{t('done.key', { ns: 'common' })}</h2>
        <ul className="c-done__list">
          {done.map((item, i) => {
            return (
              <li className={`c-done__list-item`} key={`done${i}`}>{item}</li>
            );
          })}
        </ul>
      </div>
      <div className="p-about__about">
        <Trans
          i18nKey="about"
          ns="common"
          components={{
            steam: <a href="https://store.steampowered.com/app/1140150/" target="_blank">steam</a>,
            mod: <a href={modUrl} target="_blank">mod</a>,
            discord: <a href={discordUrl} target="_blank">discord</a>
          }}
        />
      </div>
    </section>
  );
};

export default About;