import Header from 'components/common/layouts/header';
import { latestVersion } from 'configs/globals';
import LogProvider from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import RunData from './runData';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import ScrollToTop from 'components/common/utils/scrollToTop';
import Init from 'components/common/layouts/init';
import { useTranslation } from 'react-i18next';
import { getResultType } from 'utils/functions/helpers';
import Title from 'components/common/layouts/title';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();
  const { t } = useTranslation();

  let name: string | undefined;
  const array = id.split('_');
  if (array.length === 6) {
    const [, Character, PlayerType, shining, difficultyRequest, Type] = array
    const resultType = getResultType(Type);
    name = [
      t(Character, { ns: 'enemies' }) + PlayerType,
      t(shining, { ns: 'exhibits' }),
      difficultyRequest,
      t(`results.${resultType}`, { ns: 'common' })
    ].join(' ');
  }

  return (
    <Init ver={ver}>
      {name && <Title name={name} />}
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