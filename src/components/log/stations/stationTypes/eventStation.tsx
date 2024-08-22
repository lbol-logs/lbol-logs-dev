import { TStation } from 'utils/types/runData';
import { useTranslation } from 'react-i18next';
import ChoicesWidget from '../parts/choicesWidget';
import BattleStation from './battleStation';
import { iconSize } from 'configs/globals';
import CurrentChange from '../currentChange';
import EventHead from '../parts/eventHead';

function EventStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards, Node: { Level } } = station;
  const { t } = useTranslation();

  const { Choices, Battle } = Data;
  const id = Id as string;

  const choices = (
    <div>
      <ChoicesWidget id={id} choices={Choices} />
    </div>
  );

  const additionalElements: Array<JSX.Element> = [];

  if (Battle) {
    additionalElements.push(
      <BattleStation station={station} />
    );
  }

  const size = iconSize * 2;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            {choices}
            {additionalElements}
          </div>
        </div>
      </div>
      <div className="p-entities">
        <CurrentChange level={Level} />
      </div>
    </div>
  );
}

export default EventStation;