import { useTranslation } from 'react-i18next';


function CharacterShortName({ character }: { character: string }) {
  const { t } = useTranslation();

  const name = t(character, { ns: 'enemies', context: 'short' });
  
  return (
    <>
      {name}
    </>
  );
}

export default CharacterShortName;