import { useContext } from 'react';
import Map from './map/map';
import Stations from './stations/stations';
import { LogContext } from 'contexts/logContext';
import { Trans, useTranslation } from 'react-i18next';

function RunDataTemplate() {
  useTranslation();
  const { act } = useContext(LogContext);

  return (
    <>
      <h2 className="c-act__title">
        <Trans
            i18nKey="act"
            ns="log"
            children={{
              act: act
            }}
          />
      </h2>
      <Map />
      <Stations />
    </>
  );
}

export default RunDataTemplate;