import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getResultImage, getSpellcardImage } from 'utils/functions/getImage';
import { resultSizes } from 'configs/globals';
import { TObjAny } from 'utils/types/common';
import ExhibitImage from './exhibitImage';

function ResultWidget({ resultData }: { resultData: TObjAny }) {
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
      <LazyLoadImage2 className="p-result__avatar" callback={getResultImage} name={`${Character}${Type}`} width={avatar} height={height} alt={`${character} ${type}`} />
      <LazyLoadImage2 className="p-result__spellcard" callback={getSpellcardImage} name={spellcard} alt={t(`spellcards.${spellcard}`, { ns: 'common' })} />
      <span className={`p-result__type p-result__type--${Type}`}>{type}</span>
      <span className="p-result__difficulty">
        {Difficulty}{requests}
      </span>
      <time className="p-result__timestamp" dateTime={Timestamp}>{date}</time>
      <ExhibitImage className="p-result__exhibit" exhibit={exhibit} />
      <LazyLoadImage2 className="p-result__background" callback={getResultImage} name="bg" width={bg} height={height} alt="" />
    </div>
  );
}

export default ResultWidget;