
import Header from 'components/common/layouts/header';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from './runList';
import Footer from 'components/common/layouts/footer';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import RunListProvider from 'contexts/runListContext';
import Init from 'components/common/layouts/init';

function Top() {
  const { ver = latestVersion } = useParams<{ ver: string }>();

  return (
    <Init ver={ver}>
      <Header versionSwitch={true} />
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
    </Init>
  );
};

export default Top;