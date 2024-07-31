
import Header from 'components/common/header';
import About from 'components/top/about';
import useVersion from 'components/hooks/useVersion';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from 'components/top/runList';
import Footer from 'components/common/footer';

function Top() {  
  const { ver = latestVersion } = useParams<{ ver: string }>();
  useVersion(ver);

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