import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { gameUrl, languages, modUrl } from 'configs/globals';
import { ReactNode } from 'react';
import RoadMap from 'components/about/roadMap';
import Done from 'components/about/done';
import Header from 'components/common/layouts/header';

function External({ href, children }: { href: string, children?: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function About() {
  const { t } = useTranslation();
  const { discord } = languages[i18next.language];

  type Categories = {
    [key: string]: Array<string>
  };

  const roadmapCategories: Categories = t('roadmap.categories', { ns: 'site', returnObjects: true });
  const doneCategories: Categories = t('done.categories', { ns: 'site', returnObjects: true });
  const attention: Array<string> = t('attention.value', { ns: 'site', returnObjects: true });

  return (
    <>
      <Header />
      <main className="l-about">
        <div className="l-inner">
          <section className="p-about">
            <div className="p-about__break"></div>

            <div className="p-about__about">
              <Trans
                i18nKey="about"
                ns="site"
                components={{
                  steam: <External href={gameUrl} />,
                  mod: <External href={modUrl} />,
                  discord: <External href={discord} />
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
        </div>
      </main>
    </>
  );
};

export default About;