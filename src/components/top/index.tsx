
import Header from 'components/common/header';
import About from './about';
import useVersion from 'hooks/useVersion';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunList from './runList';
import Footer from 'components/common/footer';
import { useState } from 'react';
import UseList from 'hooks/useList';
import { useTranslation } from 'react-i18next';
import { TRunList } from 'utils/types';

function Top() {  
  const { ver = latestVersion } = useParams<{ ver: string }>();
  useVersion(ver);

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList]: [TRunList, React.Dispatch<React.SetStateAction<TRunList>>] = useState({});

  return (
    <>
      <Header isTop={true} />
      <main className="l-top">
        <div className="l-inner">
          <About />
          <section className="p-run-list">
            <UseList setIsLoading={setIsLoading} setList={setList} version={ver} />
            {isLoading
              ? t('loading', { ns: 'common' })
              : <RunList list={list} />
            }
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Top;