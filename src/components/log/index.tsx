import Header from 'components/common/layouts/header';
import { latestVersion } from 'configs/globals';
import { useParams } from 'react-router-dom';
import RunData from './runData';
import { Suspense } from 'react';
import Loading from 'components/common/layouts/loading';
import Init from 'components/common/layouts/init';
import { useTranslation } from 'react-i18next';
import { getNs, getResultType } from 'utils/functions/helpers';
import Title from 'components/common/layouts/title';
import ScrollToTop from 'components/common/utils/scrollToTop';
import LogProvider from 'contexts/logContext';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();
  const { t, i18n } = useTranslation();

  let name;
  const array = id.split('_');
  if (array.length === 6) {
    const [, Character, PlayerType, shining, difficultyRequest, Type] = array
    const resultType = getResultType(Type);

    name = [
      getTranslation(Character, 'units', 'short') + PlayerType,
      getTranslation(`${shining}.Name`, 'exhibits'),
      difficultyRequest,
      t(`results.${resultType}`, { ns: 'common', context: 'title' })
    ].join(' ');
  }
  else {
    name = id;
  }

  function getTranslation(key: string, ns: string, context?: string) {
    if (i18n.exists(key, { ns })) return t(key, { ns, context });
    const [_ns] = getNs({ ns, isMod: true });
    return t(key, { ns: _ns, context });
  }

  return (
    <Init ver={ver}>
      {name && <Title name={name} />}
      <Suspense fallback={<Loading />}>
        <Header />
        <LogProvider>
          <ScrollToTop />
          <RunData ver={ver} id={id} />
        </LogProvider>
      </Suspense>
    </Init>
  );
};

export default Log;