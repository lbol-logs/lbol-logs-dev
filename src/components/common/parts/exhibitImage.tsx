import { getExhibitImage } from 'utils/functions/getImage';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { TExhibit } from 'utils/types/runData';
import { getEntityNs } from 'utils/functions/helpers';

function ExhibitImage({ exhibit, className, alt }: { exhibit: TExhibit, className?: string, alt?: string }) {
  const { t } = useTranslation();

  let _alt: string;
  const [ns, isMod] = getEntityNs({ exhibit: { Id: exhibit } });
  if (alt === undefined) {
    _alt = t(`${exhibit}.Name`, { ns });
  }
  else {
    _alt = alt;
  }

  return <LazyLoadImage2 className={className} callback={getExhibitImage} name={exhibit} alt={_alt} isMod={isMod} />;
}

export default ExhibitImage;