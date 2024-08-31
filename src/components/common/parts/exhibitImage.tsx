import { getExhibitImage } from 'utils/functions/getImage';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { TExhibit } from 'utils/types/runData';

function ExhibitImage({ exhibit, className, alt }: { exhibit: TExhibit, className?: string, alt?: string }) {
  const { t } = useTranslation();

  const _alt = alt === undefined ? t(exhibit, { ns: 'exhibits' }) : alt;

  return <LazyLoadImage2 className={className} callback={getExhibitImage} name={exhibit} alt={_alt} />;
}

export default ExhibitImage;