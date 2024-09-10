import Header from 'components/common/layouts/header';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import RunData from './runData';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import ScrollToTop from 'components/common/utils/scrollToTop';
import Init from 'components/common/layouts/init';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();

  return (
    <Init ver={ver}>
      <Suspense fallback={<Loading />}>
        <Header versionSwitch={false} />
        <main className="l-log">
          <div className="l-log__inner l-inner">
            <LogProvider>
              <ScrollToTop />
              <RunData ver={ver} id={id} />
            </LogProvider>
          </div>
        </main>
      </Suspense>
    </Init>
  );
};

export default Log;