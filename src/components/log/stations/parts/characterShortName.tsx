import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { getNs } from 'utils/functions/helpers';

function CharacterShortName() {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const [ns] = getNs({ ns: 'units', character: Character });
  const name = t(Character, { ns, context: 'short' });

  return (
    <span className={`c-character-short-name c-character-short-name--${Character}`}>
      {name}
    </span>
  );
}

export default CharacterShortName;