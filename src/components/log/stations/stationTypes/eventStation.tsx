import { TStation } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import ChoicesWidget from '../parts/choicesWidget';
import BattleStation from './battleStation';

function EventStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards } = station;
  const { t } = useTranslation();

  const { Choices, Battle } = Data;

  const choices = (
    <div>
      <ChoicesWidget id={Id as string} choices={Choices} />
    </div>
  );

  const additionalElements: Array<JSX.Element> = [];

  if (Battle) {
    additionalElements.push(
      <BattleStation station={station} />
    );
  }

  return (
    <>
      <p>{t(Id as string, { ns: 'events' })}</p>
      {choices}
      {additionalElements}
    </>
  );
}

export default EventStation;