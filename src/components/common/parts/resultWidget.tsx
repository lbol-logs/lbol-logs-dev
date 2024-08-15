import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getExhibitImage, getResultImage, getSpellcardImage } from 'utils/functions/getImage';
import { iconSize, resultSizes } from 'configs/globals';
import { TObjAny } from 'utils/types/common';

function ResultWidget({ resultData }: { resultData: TObjAny}) {
  const { t } = useTranslation();
  const { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests } = resultData;
  const { bg, avatar, height } = resultSizes;
  const spellcard = Character + PlayerType;
  const character = t(Character, { ns: 'enemies' });
  const type = t(`results.${Type}`, { ns: 'common' });
  const count = Requests.length;
  const requests = count ? ` (${count})` : '';
  const date = new Date(Timestamp).toLocaleString();

  return (
    <div className="p-result u-text-shadow">
      <LazyLoadImage className="p-result__avatar" src={getResultImage(`${Character}${Type}`)} width={avatar} height={height} alt={`${character} ${type}`} />
      <LazyLoadImage className="p-result__spellcard" src={getSpellcardImage(spellcard)} width={iconSize} height={iconSize} alt={t(`spellcards.${spellcard}`, { ns: 'common' })} />
      <span className={`p-result__type p-result__type--${Type}`}>{type}</span>
      <span className="p-result__difficulty">
        {Difficulty}{requests}
      </span>
      <time className="p-result__timestamp" dateTime={Timestamp}>{date}</time>
      <LazyLoadImage className="p-result__exhibit" src={getExhibitImage(exhibit)} width={iconSize} height={iconSize} alt={t(exhibit, { ns: 'exhibits' })} />
      <LazyLoadImage className="p-result__background" src={getResultImage('bg')} width={bg} height={height} alt="" />
    </div>
  );
}

export default ResultWidget;