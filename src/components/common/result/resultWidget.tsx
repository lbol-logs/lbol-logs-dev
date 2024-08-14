import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getExhibitImage, getResultImage } from 'utils/functions/getImage';
import DateTime from './dateTime';
import { iconSize, resultSizes } from 'configs/globals';
import { TObjAny } from 'utils/types/common';

function ResultWidget({ resultData }: { resultData: TObjAny}) {
  const { t } = useTranslation();
  const { Character, Type, Timestamp, Difficulty, exhibit, Requests } = resultData;
  const { bg, avatar, height } = resultSizes;
  const character = t(Character, { ns: 'enemies' });
  const type = t(`result.${Type}`, { ns: 'common' });
  const count = Requests.length;
  const requests = count ? ` (${count})` : '';

  return (
    <div className="p-result u-text-shadow">
      <LazyLoadImage className="p-result__avatar" src={getResultImage(`${Character}${Type}`)} width={avatar} height={height} alt={`${character} ${type}`} />
      <span className={`p-result__type p-result__type--${Type}`}>{type}</span>
      <span className="p-result__difficulty">
        {Difficulty}{requests}
      </span>
      <span className="p-result__timestamp">
        <DateTime timestamp={Timestamp} />
      </span>
      <LazyLoadImage className="p-result__exhibit" src={getExhibitImage(exhibit)} width={iconSize} height={iconSize} alt={t(exhibit, { ns: 'exhibits' })} />
      <LazyLoadImage className="p-result__background" src={getResultImage('bg')} width={bg} height={height} alt="" />
    </div>
  );
}

export default ResultWidget;