import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Svg from './svg';
import Icons from './icons';
import Links from './links';

function Map() {
  const { t } = useTranslation();
  const { runData, act } = useContext(LogContext);

  const { Stations, Acts } = runData;
  const ActObj = Acts[act - 1];

  return (
    <section className="p-map">
      <h2 className="p-map__title">{t('map', { ns: 'log' })}</h2>
      <div className="p-map__map">
        <Links Stations={Stations} />
        <Icons ActObj={ActObj} />
        <Svg ActObj={ActObj} />
      </div>
    </section>
  );
}

export default Map;