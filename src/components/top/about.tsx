import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { languages } from 'configs/globals';
import RoadMap from './roadMap';
import Done from './done';

function About() {
  const { t } = useTranslation();
  const language = i18next.language;
  const modUrl = `https://github.com/ed-ev/lbol-runLogger/blob/master/README${language === Object.keys(languages)[0] ? '' : '-' + language}.md`;
  const discordUrl = language === Object.keys(languages)[0]
    ? 'https://discord.com/channels/1040229874176098344/1267772366054887506'
    : 'https://discord.com/channels/1040229874176098344/1267772986254163990';

  type Categories = {
    [key: string]: Array<string>
  };

  const roadmapCategories: Categories = t('roadmap.categories', { returnObjects: true });
  const doneCategories: Categories = t('done.categories', { returnObjects: true });
  const attention: Array<string> = t('attention.value', { returnObjects: true });

  return (
    <section className="p-about">
      <p className="p-about__under-construction">
        <Trans
          i18nKey="underConstruction"
          ns="site"
        />
      </p>
      
      <div className="p-about__break"></div>

      <div className="p-about__about">
        <Trans
          i18nKey="about"
          ns="site"
          components={{
            steam: <a href="https://store.steampowered.com/app/1140150/" target="_blank" rel="noreferrer">{}</a>,
            mod: <a href={modUrl} target="_blank" rel="noreferrer">{}</a>,
            discord: <a href={discordUrl} target="_blank" rel="noreferrer">{}</a>
          }}
        />
      </div>

      <div className="p-about__roadmap c-roadmap">
        <h2 className="c-roadmap__title">{t('roadmap.keys.roadmap', { ns: 'site' })}</h2>
        {Object.entries(roadmapCategories).map(([category, array]) => {
          const key = `c-roadmap-${category}`;
          return <RoadMap className={key} category={category} array={array} key={key} />;
        })}
      </div>

      <div className="p-about__done c-done">
      <h2 className="c-done__title">{t('done.keys.done', { ns: 'site' })}</h2>
        {Object.entries(doneCategories).map(([category, array]) => {
          const key = `c-done-${category}`;
          return <Done className={key} category={category} array={array} key={key} />;
        })}
      </div>

      <div className="p-about__attention">
        <h2 className="c-attention__title">{t('attention.key', { ns: 'site' })}</h2>
        <ul className="c-attention__list">
          {attention.map((item, i) => {
            return <li className="c-attention__list-item" key={`attention${i}`}>{item}</li>;
          })}
        </ul>
      </div>
    </section>
  );
};

export default About;