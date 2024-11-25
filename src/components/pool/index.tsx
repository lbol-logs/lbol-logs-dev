import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import { useTranslation } from 'react-i18next';
import Init from 'components/common/layouts/init';
import Title from 'components/common/layouts/title';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import CardPoolContext from 'contexts/cardPoolContext';
import PoolTemplate from './poolTemplate';
import { latestVersion } from 'configs/globals';

function Pool() {
  const { t } = useTranslation();

  const configs: Array<string> = [
    'cards',
    'characters',
    'exhibits',
    'events'
  ];

  return (
    <Init configs={configs} ver={latestVersion} >
      <Title name={t('cardPool', { ns: 'site' })} />
      <Header />
      <main className="l-pool">
        <div className="l-inner">
          <Suspense fallback={<Loading />}>
            <CardPoolContext>
              <PoolTemplate />
            </CardPoolContext>
          </Suspense>
        </div>
      </main>
      <Footer />
    </Init>
  );
};

export default Pool;