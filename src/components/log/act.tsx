import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function Act() {
  const { act } = useContext(LogContext);
  useTranslation();

  return (
    <Trans
        i18nKey="act"
        ns="log"
        values={{
          act: act
        }}
        context={act.toString()}
      />
  );
}

export default Act;