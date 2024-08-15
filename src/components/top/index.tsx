
import Header from 'components/common/layouts/header';
import About from './about';
import useVersion from 'hooks/useVersion';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from './runList';
import Footer from 'components/common/layouts/footer';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';

function Top() {
  const { ver = latestVersion } = useParams<{ ver: string }>();
  useVersion(ver);

  return (
    <>
      <Header />
      <main className="l-top">
        <div className="l-inner">
          <About />
          <Suspense fallback={<Loading />}>
            <RunList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Top;