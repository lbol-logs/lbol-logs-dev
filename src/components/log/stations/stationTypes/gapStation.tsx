import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import useGap from 'hooks/useGap';
import { use } from 'i18next';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { getGapImage } from 'utils/functions/getImage';
import { THolding, TStation } from 'utils/types/runData';

function GapStation({ station }: { station: TStation }) {
  const { Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  const { t } = useTranslation();

  return (
    <div className="p-gap-choices">
      WIP
      {Options.map((option, i) => {
        const isChosen = option === Choice;

        return (
          <div className={`p-gap-choice ${isChosen ? 'p-gap-choice--chosen' : ''}`} key={i}>
            <LazyLoadImage2 className="p-gap-choice__icon" callback={getGapImage} name={option} alt={t(`Names.${option}`, { ns: 'gap' })} />
            <GapDescription station={station} option={option} />
          </div>
        );
      })}
    </div>
  );
}

function GapDescription({ station, option }: { station: TStation, option: string }) {
  const { runData, holdings } = useContext(LogContext);
  const { Type, Node, Status, Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  const { t } = useTranslation();
  
  let desc = `Descriptions.${option}`;
  const isDrinkTea = Type === 'DrinkTea';
  const currentHolding = holdings.find(({ Act, Level }) => Act === Node.Act && Level === Node.Level) as THolding;
  const additionalDesc = useGap(isDrinkTea, currentHolding);

  if (!isDrinkTea) {
    const PayForUpgrade = 'PayForUpgrade';
    const isPayForUpgrade = runData.Settings.Requests.includes(PayForUpgrade);
    const isUpgradeCard = Type === 'UpgradeCard';
    if (isPayForUpgrade && isUpgradeCard) desc += `_${PayForUpgrade}`;
  }


  return (
    <>
      <Trans
        i18nKey={desc}
        ns="gap"
      />
      {additionalDesc}
    </>
  );
}

export default GapStation;