import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getDifficultyImage } from 'utils/functions/getImage';

function DifficultyWidget({ difficulty }: { difficulty: string }) {
  const { t } = useTranslation();

  return (
    <LazyLoadImage2 callback={getDifficultyImage} name={difficulty} alt={t(`difficulties.${difficulty}`, { ns: 'common' })} />
  );
}

export default DifficultyWidget;