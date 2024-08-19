import { LogContext } from 'contexts/logContext';
import useGap from 'hooks/useGap';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TStation } from 'utils/types/runData';
import GapDescription from './gapDescription';

function GapDescriptions({ station, option }: { station: TStation, option: string }) {
  const { runData, holdings } = useContext(LogContext);
  const { Node, Status, Data } = station;
  const { Choice, Options} = Data as { Choice: string, Options: Array<string> };
  useTranslation();
  
  let desc = `Descriptions.${option}`;
  const isDrinkTea = option === 'DrinkTea';
  const additionalDescRef = useGap(isDrinkTea, holdings, Node);
  const additionalDesc = additionalDescRef.current as Array<JSX.Element>;
  console.log('incomponent', additionalDescRef.current);

  if (!isDrinkTea) {
    const PayForUpgrade = 'PayForUpgrade';
    const isPayForUpgrade = runData.Settings.Requests.includes(PayForUpgrade);
    const isUpgradeCard = option === 'UpgradeCard';
    if (isPayForUpgrade && isUpgradeCard) desc += `_${PayForUpgrade}`;
  }


  return (
    <div className="p-gap-choice__descs">
      <GapDescription desc={desc} key={desc} />
      {additionalDesc}
    </div>
  );
}

export default GapDescriptions;