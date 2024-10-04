import { getExhibitImage } from 'utils/functions/getImage';
import LazyLoadImage2 from '../utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { TExhibit } from 'utils/types/runData';
import { getNs } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';

function ExhibitImage({ exhibit, className, alt }: { exhibit: TExhibit, className?: string, alt?: string }) {
  const { t } = useTranslation();

  let _alt: string;
  const { exhibitsConfigs } = configsData;
  const isMod = !exhibitsConfigs.has(exhibit);
  if (alt === undefined) {
    const [ns] = getNs({ ns: 'exhibits', isMod });
    _alt = t(`${exhibit}.Name`, { ns });
  }
  else {
    _alt = alt;
  }

  return <LazyLoadImage2 className={className} callback={getExhibitImage} name={exhibit} alt={_alt} isMod={isMod} />;
}

export default ExhibitImage;