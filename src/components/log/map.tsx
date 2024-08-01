import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Svg from 'components/log/svg';

function Map() {
  const { t } = useTranslation();
  const { runData, act, setAct } = useContext(LogContext);
  const { Acts } = runData;

  // setAct(1);
  // console.log({act});
  console.log(runData);
  console.log(Acts);
  const ActObj = Acts[1];

  return (
    <section className="p-map">
      <h2 className="p-map__title">{t('map', { ns: 'log' })}</h2>
      <div className="p-map__map">
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;