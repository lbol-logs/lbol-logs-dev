import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getGapImage } from 'utils/functions/getImage';
import { TStation } from 'utils/types/runData';
import GapDescriptions from '../parts/gapDescriptions';

function GapStation({ station }: { station: TStation }) {
  const { Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  const { t } = useTranslation();

  return (
    <div className="p-gap">
      <div className="p-gap-choices">
        WIP
        {Options.map((option, i) => {
          const isChosen = option === Choice;

          return (
            <div className={`p-gap-choice ${isChosen ? 'p-gap-choice--chosen' : ''}`} key={i}>
              <LazyLoadImage2 className="p-gap-choice__icon" callback={getGapImage} name={option} alt={t(`Names.${option}`, { ns: 'gap' })} />
              <GapDescriptions station={station} option={option} />
            </div>
          );
        })}
      </div>

      {/* TODO: Little Chat */}
    </div>
  );
}

export default GapStation;