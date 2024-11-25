import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import CommonProvider from 'contexts/commonContext';
import { baseUrl } from 'configs/globals';
import RemoveTrailingSlash from 'components/common/utils/removeTrailingSlash';
import Top from 'components/top';
import Log from 'components/log';
import About from 'components/about';
import Upload from 'components/upload';
import Pool from 'components/pool';
import Loading from 'components/common/layouts/loading';
import { Suspense } from 'react';

function Layout() {
  const { t } = useTranslation();
  const lang = i18next.language;
  const title = t('title', { ns: 'site' });
  const subtitle = t('subtitle', { ns: 'site' });

  return (
    <HelmetProvider>
      <Helmet>
        <html lang={lang} />
        <title>{title} - {subtitle}</title>
        <meta name="description" content={t('description', { ns: 'site' })} />
        <link rel="manifest" href={`${baseUrl}/locales/${i18next.language}/manifest.json`} />
        <meta name="apple-mobile-web-app-title" content={title} />
      </Helmet>

      <RemoveTrailingSlash />
      <CommonProvider>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      </CommonProvider>
    </HelmetProvider>
  );
}

function App() {
  const routes = [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          children: [
            {
              index: true,
              element: <Top />
            },
            {
              path: 'about/',
              element: <About />
            },
            {
              path: 'upload/',
              element: <Upload />
            },
            {
              path: 'pool/',
              element: <Pool />
            },
            {
              path: ':ver/',
              children: [
                {
                  index: true,
                  element: <Top />
                },
                {
                  path: ':id/',
                  element: <Log />
                }
              ]
            },
          ]
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ];
  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
