
import Header from 'components/common/layouts/header';
import useVersion from 'hooks/useVersion';
import { baseUrl, latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from './runList';
import Footer from 'components/common/layouts/footer';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import RunListProvider from 'contexts/runListContext';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

function Top() {
  const { t } = useTranslation();
  const title = t('title', { ns: 'site' });
  const substitle = t('subtitle', { ns: 'site' });

  const { ver = latestVersion } = useParams<{ ver: string }>();
  const [isValidVersion, redirect] = useVersion(ver);

  if (!isValidVersion) return redirect as unknown as JSX.Element;

  return (
    <>
    {/* TODO */}
      <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} - ${substitle}`} />
        <meta name="twitter:description" content={t('description', { ns: 'site' })} />
        <meta name="twitter:image" content={`${baseUrl}/logo512.png`} />
      </Helmet>
      <Header />
      <main className="l-top">
        <div className="l-inner">
          <Suspense fallback={<Loading />}>
            <RunListProvider>
              <RunList />
            </RunListProvider>
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Top;