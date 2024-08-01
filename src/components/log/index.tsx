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
  useVersion(ver);
  useRunData(id);

  const { t } = useTranslation();
  const { isLoading } = useContext(LogContext);

  /*
   * TODO: id取得失敗は分岐表示
   */

  return (
    <>
      <Header isLog={true} />
      <LogProvider>
        <h1>Logページです</h1>
        <p>バージョン: {ver}</p>
        <p>ID: {id}</p>
        {isLoading
          ? t('loading', { ns: 'common' })
          : <RunData />
        }
      </LogProvider>
    </>
  );
};

export default Log;