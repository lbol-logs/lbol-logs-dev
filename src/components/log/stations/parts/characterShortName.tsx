import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';


function CharacterShortName() {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { t } = useTranslation();

  const name = t(Character, { ns: 'enemies', context: 'short' });
  // TODO
  return (
    <>
      {name}
    </>
  );
}

export default CharacterShortName;