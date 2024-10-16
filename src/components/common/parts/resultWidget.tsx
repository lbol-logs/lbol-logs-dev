import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getResultImage } from 'utils/functions/getImage';
import { resultSizes } from 'configs/globals';
import { TObjAny } from 'utils/types/common';
import ExhibitImage from './exhibitImage';
import { getNs, getResultType } from 'utils/functions/helpers';
import SpellcardImage from '../utils/spellcardImage';

function ResultWidget({ resultData, name }: { resultData: TObjAny, name: string | undefined }) {
  const { t } = useTranslation();
  const { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests } = resultData;
  const { bg, avatar, height } = resultSizes;
  const spellcard = Character + PlayerType;
  const [ns, isMod] = getNs({ ns: 'units', character: Character });
  const character = t(Character, { ns });
  const resultType = getResultType(Type);
  const type = t(`results.${resultType}`, { ns: 'common' });
  const resultAlt = `${character} ${type}`;
  const count = Requests.length;
  const requests = count ? ` (${count})` : '';
  const date = new Date(Timestamp).toLocaleString();

  return (
    <div className="p-result u-text-shadow">
      <LazyLoadImage2 className="p-result__background" callback={getResultImage} name="bg" width={bg} height={height} alt="" />
      <LazyLoadImage2 className="p-result__avatar" callback={getResultImage} name={`${Character}${resultType}`} width={avatar} height={height} alt={resultAlt} isMod={isMod} />
      <SpellcardImage className="p-result__spellcard" spellcard={spellcard} />
      <ExhibitImage className="p-result__exhibit" exhibit={exhibit} />
      <span className={`p-result__type p-result__type--${resultType}`}>{type}</span>
      <span className="p-result__difficulty">
        {Difficulty}{requests}
      </span>
      <time className="p-result__timestamp" dateTime={Timestamp}>{date}</time>
      {name && <span className="p-result__name">{name}</span>}
      {isMod && <span className="p-result__modded">Mod</span>}
    </div>
  );
}

export default ResultWidget;