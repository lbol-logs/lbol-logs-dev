import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { getNs } from 'utils/functions/helpers';
import { useSearchParams } from 'react-router-dom';

function CharacterShortName() {
  const { runData: { Settings } } = useContext(LogContext);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  let Character;
  if (Settings) {
    ({ Character } = Settings);
  }
  else {
    Character = searchParams.get('ch') as string;
  }

  const [ns] = getNs({ ns: 'units', character: Character });
  const name = t(Character, { ns, context: 'short' });

  return (
    <span className={`c-character-short-name c-character-short-name--${Character}`}>
      {name}
    </span>
  );
}

export default CharacterShortName;