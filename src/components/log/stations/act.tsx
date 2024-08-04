import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function Act() {
  const { act } = useContext(LogContext);
  useTranslation();

  return (
    <h2 className="c-act__title">
      <Trans
          i18nKey="act"
          ns="log"
          children={{
            act: act
          }}
        />
    </h2>
  );
}

export default Act;