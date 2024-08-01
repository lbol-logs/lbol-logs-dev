import Header from 'components/common/header';
import useRunData from 'hooks/useRunData';
import useVersion from 'hooks/useVersion';
import { latestVersion } from 'configs/globals';
import LogProvider, { LogContext } from 'contexts/logContext';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import RunData from 'components/log/runData';

function Log() {
  const { ver = latestVersion, id = '' } = useParams<{ ver: string, id: string }>();

  const { t } = useTranslation();
  const { isLoading } = useContext(LogContext);

  useVersion(ver);
  useRunData(id);

  /*
   * TODO: id取得失敗は分岐表示
   */

  return (
    <>
      <Header isLog={true} />
      <LogProvider>
        {isLoading
          ? t('loading', { ns: 'common' })
          : <RunData />
        }
          <h1>Logページです</h1>
          <p>バージョン: {ver}</p>
          <p>ID: {id}</p>
      </LogProvider>
    </>
  );
};

export default Log;