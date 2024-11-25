import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { gameUrl, languages, modUrl } from 'configs/globals';
import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import { Link } from 'react-router-dom';
import ExternalLink from 'components/common/parts/externalLink';
import Compatability from 'components/common/parts/compatability';
import Init from 'components/common/layouts/init';
import Title from 'components/common/layouts/title';
import AboutMods from './aboutMods';

function About() {
  const { t } = useTranslation();
  const { discord } = languages[i18next.language];

  const configs: Array<string> = [
  ];
  const modsConfigs: Array<string> = [
    'mods'
  ];

  const tasks: Array<string> = t('lbolLogs.tasks', { ns: 'site', returnObjects: true });
  const attention: Array<string> = t('attention.value', { ns: 'site', returnObjects: true });

  return (
    <Init configs={configs} modsConfigs={modsConfigs}>
      <Title name="About" />
      <Header alwaysLatest={true} />
      <main className="l-about">
        <div className="l-inner">
          <section className="p-about">
            <div className="p-about__about">
              <Trans
                i18nKey="about"
                ns="site"
                components={{
                  steam: <ExternalLink href={gameUrl} />,
                  compatability: <Compatability />,
                  discord: <ExternalLink href={discord} />
                }}
              />
            </div>
            <div className="u-break"></div>

            <div className="p-about-run-logger">
              <h2 className="p-about-run-logger__about">{t('runLogger.about', { ns: 'site' })}</h2>
              <div className="p-about-run-logger__block">
                <h3 className="p-about-run-logger__about-steps">{t('runLogger.aboutSteps', { ns: 'site' })}</h3>
                <ol className="p-about-run-logger__steps">
                  <li className="p-about-run-logger__step">
                    <Trans
                      i18nKey="runLogger.step1"
                      ns="site"
                      components={{ r2modman: <ExternalLink href="https://thunderstore.io/package/ebkr/r2modman/" /> }}
                    />
                  </li>
                  <li className="p-about-run-logger__step">
                    <Trans
                      i18nKey="runLogger.step2"
                      ns="site"
                      components={{ mod: <ExternalLink href={modUrl} /> }}
                    />
                  </li>
                  <li className="p-about-run-logger__step">{t('runLogger.step3', { ns: 'site' })}</li>
                  <li className="p-about-run-logger__step">
                    <Trans
                      i18nKey="runLogger.step4"
                      ns="site"
                    />
                  </li>
                  <li className="p-about-run-logger__step">
                    <Trans
                      i18nKey="runLogger.step5"
                      ns="site"
                      components={{ upload: <Link to="/upload/">{}</Link> }}
                    />
                  </li>
                </ol>
              </div>
            </div>

            <div className="p-about-lbol-logs">
              <div className="p-about-lbol-logs__block">
                <h2 className="p-about-lbol-logs__update">{t('lbolLogs.update', { ns: 'site' })}</h2>
                <ul className="p-about-lbol-logs__tasks">
                  {tasks.map((task, i) => {
                    return <li className="p-about-lbol-logs__task" key={i}>{task}</li>;
                  })}
                </ul>
              </div>
              <AboutMods />
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
      <Footer />
    </Init>
  );
};

export default About;