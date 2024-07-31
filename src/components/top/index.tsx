
import Header from 'components/common/header';
import About from 'components/top/about';
import CheckVersion from 'components/utils/checkVersion';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from 'components/top/runList';
import Footer from 'components/common/footer';

function Top() {  
  const { ver = latestVersion } = useParams<{ ver: string }>();
  CheckVersion(ver);

  return (
    <>
      <Header />
      <main className="l-top">
        <About />
        <RunList />
      </main>
      <Footer />
    </>
  );
};

export default Top;