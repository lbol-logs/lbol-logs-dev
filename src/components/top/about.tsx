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

  const roadmapCategories: Categories = t('roadmap.categories', { returnObjects: true });
  const doneCategories: Categories = t('done.categories', { returnObjects: true });

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
        {Object.entries(roadmapCategories).map(([category, array]) => {
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
      <h2 className="c-done__title">{t('done.keys.done', { ns: 'common' })}</h2>
        {Object.entries(doneCategories).map(([category, array]) => {
          const key = `c-done-${category}`;
          return (
            <div className={key} key={key}>
              <h3 className={`${key}__title`}>{t(`done.keys.${category}`, { ns: 'common' })}</h3>
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
      <div className="p-about__about">
        <Trans
          i18nKey="about"
          ns="common"
          components={{
            steam: <a href="https://store.steampowered.com/app/1140150/" target="_blank" rel="noreferrer">steam</a>,
            mod: <a href={modUrl} target="_blank" rel="noreferrer">mod</a>,
            discord: <a href={discordUrl} target="_blank" rel="noreferrer">discord</a>
          }}
        />
      </div>
    </section>
  );
};

export default About;