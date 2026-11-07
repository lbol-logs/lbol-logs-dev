import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import { gameUrl, languages, steamWorkshopUrl, thunderstoreUrl } from 'configs/globals';
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

  const attention: Array<string> = t('attention.value', { ns: 'site', returnObjects: true });

  return (
    <Init configs={configs} modsConfigs={modsConfigs}>
      <Title name="About" />
      <Header />
      <main className="l-about">
        <div className="l-inner">
          <section className="p-about">
            <div className="p-about-lbol-logs">
              <h2 className="p-about-lbol-logs__head">{t('lbolLogs.head', { ns: 'site' })}</h2>
              <Trans
                i18nKey="lbolLogs.about"
                ns="site"
                components={{
                  steam: <ExternalLink href={gameUrl} type="steam" />,
                  compatability: <Compatability />,
                  discord: <ExternalLink href={discord} type="discord" />
                }}
              />
            </div>

            <AboutMods />

            <div className="p-about-run-logger">
              <h2 className="p-about-run-logger__head">{t('runLogger.head', { ns: 'site' })}</h2>

              <div className="p-about-run-logger__mod--steamWorkshop">
                <h3 className="p-about-run-logger__head--steamWorkshop">{t('runLogger.steamWorkshop.head', { ns: 'site' })}</h3>
                <ol className="p-about-run-logger__steps--steamWorkshop">
                  <li className="p-about-run-logger__step--steamWorkshop">
                    <Trans
                      i18nKey="runLogger.steamWorkshop.step1"
                      ns="site"
                      components={{ steamWorkshop: <ExternalLink href={steamWorkshopUrl} type="steam" /> }}
                    />
                  </li>
                  <li className="p-about-run-logger__step--steamWorkshop">{t('runLogger.steamWorkshop.step2', { ns: 'site' })}</li>
                  <li className="p-about-run-logger__step--steamWorkshop">{t('runLogger.steamWorkshop.step3', { ns: 'site' })}</li>
                  <li className="p-about-run-logger__step--steamWorkshop">{t('runLogger.steamWorkshop.step4', { ns: 'site' })}</li>
                </ol>
              </div>

              <div className="p-about-run-logger__mod--thunderstore">
                <h3 className="p-about-run-logger__head--thunderstore">{t('runLogger.thunderstore.head', { ns: 'site' })}</h3>
                <ol className="p-about-run-logger__steps--thunderstore">
                  <li className="p-about-run-logger__step--thunderstore">
                    <Trans
                      i18nKey="runLogger.thunderstore.step1"
                      ns="site"
                      components={{ r2modman: <ExternalLink href="https://thunderstore.io/package/ebkr/r2modman/" type="thunderstore" /> }}
                    />
                  </li>
                  <li className="p-about-run-logger__step--thunderstore">
                    <Trans
                      i18nKey="runLogger.thunderstore.step2"
                      ns="site"
                      components={{ thunderstore: <ExternalLink href={thunderstoreUrl} type="thunderstore" /> }}
                    />
                  </li>
                  <li className="p-about-run-logger__step--thunderstore">{t('runLogger.thunderstore.step3', { ns: 'site' })}</li>
                  <li className="p-about-run-logger__step--thunderstore">{t('runLogger.thunderstore.step4', { ns: 'site' })}</li>
                  <li className="p-about-run-logger__step--thunderstore">
                    <Trans
                      i18nKey="runLogger.thunderstore.step5"
                      ns="site"
                      components={{ upload: <Link to="/upload/">{}</Link> }}
                    />
                  </li>
                </ol>
              </div>
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