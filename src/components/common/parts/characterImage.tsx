import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';
import { getNs } from 'utils/functions/helpers';

function CharacterImage({ character }: { character: string }) {
  const { t } = useTranslation();

  let alt: string, isMod: boolean;
  if (character === 'Mods') {
    alt = character;
    isMod = false;
  }
  else {
    let ns: string;
    [ns, isMod] = getNs({ ns: 'units', character });
    alt = t(character, { ns });
  }

  return <LazyLoadImage2 callback={getAvatarImage} name={character} alt={alt} isMod={isMod} />;
}

export default CharacterImage;