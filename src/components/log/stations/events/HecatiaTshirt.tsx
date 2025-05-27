import { TDialogueConfigs, TExhibitObj, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TComponents } from 'utils/types/common';
import ExhibitCards from 'components/log/entityCards/exhibitCards';

function HecatiaTshirt({ station }: { station: TStation }) {
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;
  const { exhibit, counter } = eventsConfigs.get(id);

  const [next] = getNext(options);
  const chosen = getChosen(Choices, 0);

  const befores: TComponents = [];
  const exhibits: Array<TExhibits> = [];

  exhibits[0] = [exhibit];
  const Exhibit: TExhibitObj = {
    Id: exhibit,
    Counter: counter
  };
  befores[1] = <ExhibitCards exhibits={[Exhibit]} />;

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