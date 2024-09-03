import { TDialogueConfigs, TExhibitObj, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TComponents } from 'utils/types/common';
import ExhibitCard from 'components/log/entityCards/exhibitCard';

function HecatiaTshirt({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  const { current, next: options } = configs;
  const { exhibit, counter } = eventConfigs;

  const [next] = getNext(options);
  const chosen = Choices[0];

  const befores: TComponents = [];
  const exhibits: Array<TExhibits> = [];

  exhibits[0] = [exhibit];
  const Exhibit: TExhibitObj = {
    Id: exhibit,
    Counter: counter
  };
  befores[1] = <ExhibitCard exhibit={Exhibit} />;

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    befores,
    exhibits
  };

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default HecatiaTshirt;