import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { getAvatarImage } from 'utils/functions/getImage';
import { getNs } from 'utils/functions/helpers';

function CharacterImage({ character, className }: { character: string, className?: string }) {
  const { t } = useTranslation();

  let alt: string, isMod: boolean;
  if (character === 'Mod') {
    alt = character;
    isMod = false;
  }
  else if (character === 'Neutral') {
    alt = t('neutral', { ns: 'site' });
    isMod = false;
  }
  else {
    let ns: string;
    [ns, isMod] = getNs({ ns: 'units', character });
    alt = t(character, { ns });
  }

  return <LazyLoadImage2 className={className} callback={getAvatarImage} name={character} alt={alt} isMod={isMod} />;
}

export default CharacterImage;