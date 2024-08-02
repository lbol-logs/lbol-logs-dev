
import Header from 'components/common/header';
import About from './about';
import useVersion from 'hooks/useVersion';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from './runList';
import Footer from 'components/common/footer';
import { Suspense, useState } from 'react';
import UseList from 'hooks/useList';
import { TRunList } from 'utils/types';
import Loading from 'components/common/loading';

function Top() {  
  const { ver = latestVersion } = useParams<{ ver: string }>();
  useVersion(ver);

  return (
    <>
      <Header isTop={true} />
      <main className="l-top">
        <div className="l-inner">
          <About />
          <section className="p-run-list">
            <Suspense fallback={<Loading />}>
              <RunList />
            </Suspense>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Top;