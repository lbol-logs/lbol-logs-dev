import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';
import { getNs } from 'utils/functions/helpers';

function CharacterImage({ character, className, isMod = false }: { character: string, className?: string, isMod?: boolean }) {
  const { t } = useTranslation();

  let alt: string;
  if (character === 'Mod') {
    alt = character;
  }
  else if (character === 'Neutral') {
    alt = t('neutral', { ns: 'site' });
  }
  else {
    let ns: string;
    [ns, isMod] = getNs({ ns: 'units', character, isMod });
    alt = t(character, { ns });
  }

  return <LazyLoadImage2 className={className} callback={getAvatarImage} name={character} alt={alt} isMod={isMod} />;
}

export default CharacterImage;