import { getSpellcardImage } from 'utils/functions/getImage';
import LazyLoadImage2 from './lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { checkIsMod } from 'utils/functions/helpers';

function SpellcardImage({ spellcard, className }: { spellcard: string, className?: string }) {
  const { t } = useTranslation();

  const character = spellcard.slice(0, -1);
  const isMod = checkIsMod(character);

  return (
    <LazyLoadImage2 className={className} callback={getSpellcardImage} name={spellcard} alt={t(`spellcards.${spellcard}`, { ns: 'common' })} isMod={isMod} />
  );
}

export default SpellcardImage;