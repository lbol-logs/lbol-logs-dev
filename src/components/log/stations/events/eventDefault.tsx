import { TStation } from 'utils/types/runData';
import ChoicesWidget from '../parts/choicesWidget';
import BattleStation from '../stationTypes/battleStation';
import EventHead from '../parts/eventHead';
import RewardsWidget from '../parts/rewardsWidget';

function EventDefault({ station }: { station: TStation }) {
  const { Data, Id } = station;

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
      <RewardsWidget station={station} />
    </div>
  );
}

export default EventDefault;