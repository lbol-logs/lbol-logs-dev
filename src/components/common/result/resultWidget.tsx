import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getExhibitImage, getResultImage } from 'utils/functions/getImage';
import DateTime from './dateTime';
import { iconSize, resultSizes } from 'configs/globals';
import { TObjString } from 'utils/types/common';
import DifficultyWidget from '../settings/difficultyWidget';

function ResultWidget({ resultData }: { resultData: TObjString}) {
  const { t } = useTranslation();
  const { Character, Type, Timestamp, Difficulty, exhibit } = resultData;
  const { bg, avatar, height } = resultSizes;
  const character = t(Character, { ns: 'enemies' });
  const type = t(`result.${Type}`, { ns: 'common' });

  return (
    <div className="p-result">
  
      <LazyLoadImage className="p-result__avatar" src={getResultImage(`${Character}${Type}`)} width={avatar} height={height} alt={`${character} ${type}`} />
      <span className={`p-result__type ${Type}`}>{type}</span>
      <DifficultyWidget difficulty={Difficulty} />
      <DateTime timestamp={Timestamp} />
      <LazyLoadImage className="p-result__exhibit" src={getExhibitImage(exhibit)} width={iconSize} height={iconSize} alt={t(exhibit, { ns: 'exhibits' })} />
      <LazyLoadImage className="p-result__background" src={getResultImage('bg')} width={bg} height={height} alt="" />
    </div>
  );
}

export default ResultWidget;