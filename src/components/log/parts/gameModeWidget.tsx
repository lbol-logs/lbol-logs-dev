import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function GameModeWidget() {
  const { runData } = useContext(LogContext);
  useTranslation();

  const { GameMode } = runData.Settings;

  return (
    <span className="p-summary__game-mode">
      <Trans
        i18nKey="GameMode"
        ns="log"
        context={GameMode}
      />
    </span>
  );
}

export default GameModeWidget;