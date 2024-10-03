import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';

function CharacterImage({ character }: { character: string }) {
  const { t } = useTranslation();

  const alt = character === 'Mods' ? character : t(character, { ns: 'units' });

  return <LazyLoadImage2 callback={getAvatarImage} name={character} alt={alt} />;
}

export default CharacterImage;