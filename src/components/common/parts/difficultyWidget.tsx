import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/functions/getImage';

function DifficultyWidget({ difficulty }: { difficulty: string }) {
  const { t } = useTranslation();

  return (
    <LazyLoadImage src={getCommonImage(difficulty)} width={iconSize} height={iconSize} alt={t(`difficulties.${difficulty}`, { ns: 'common' })} />
  );
}

export default DifficultyWidget;