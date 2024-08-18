import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { Trans, useTranslation } from 'react-i18next';
import { getGapImage } from 'utils/functions/getImage';
import { TStation } from 'utils/types/runData';

function GapStation({ station }: { station: TStation }) {
  const { Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  const { t } = useTranslation();

  return (
    <div className="p-choices">
      WIP
      {Options.map((option, i) => {
        const isChosen = option === Choice;

        return (
          <div className={`p-choice ${isChosen ? 'p-choise--chosen' : ''}`} key={i}>
            <LazyLoadImage2 className="p-choice__icon" callback={getGapImage} name={option} alt={t(`Names.${option}`, { ns: 'gap' })} />
            <GapDescription station={station} option={option} />
          </div>
        );
      })}
    </div>
  );
}

function GapDescription({ station, option }: { station: TStation, option: string }) {
  const { Status, Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  const { t } = useTranslation();
  
  const desc = `Descriptions.${option}`;

  return (
    <Trans
      i18nKey={desc}
      ns="gap"
    />
  );
}

export default GapStation;