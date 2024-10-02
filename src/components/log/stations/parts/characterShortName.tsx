import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function CharacterShortName() {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const name = t(Character, { ns: 'units', context: 'short' });

  return (
    <span className={`c-character-short-name c-character-short-name--${Character} u-text-shadow`}>
      {name}
    </span>
  );
}

export default CharacterShortName;