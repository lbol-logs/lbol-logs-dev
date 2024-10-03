import { getSpellcardImage } from 'utils/functions/getImage';
import LazyLoadImage2 from './lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { checkIsMod } from 'utils/functions/helpers';
import { useModTranslation } from 'configs/i18nextMods';

function SpellcardImage({ spellcard, className }: { spellcard: string, className?: string }) {
  const { t } = useTranslation();
  const { tMod } = useModTranslation();

  const character = spellcard.slice(0, -1);
  const isMod = checkIsMod(character);
  const _t = isMod ? tMod : t;

  return (
    <LazyLoadImage2 className={className} callback={getSpellcardImage} name={spellcard} alt={_t(`spellcards.${spellcard}`, { ns: 'common' })} isMod={isMod} />
  );
}

export default SpellcardImage;