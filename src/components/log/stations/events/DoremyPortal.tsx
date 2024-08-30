import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import { MoneyImage } from '../parts/stationWidgets';
import EventHead from '../parts/eventHead';

function DoremyPortal({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices, Exhibit } = Data;

  const id = Id as string;
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];

  const { money, exhibit, misfortune } = eventConfigs;
  const { current, next: options } = configs;


  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const cards: Array<TCards> = [];
  const exhibits: Array<TExhibits> = [];

  exhibits[0] = [exhibit];
  const values = { 0: money };
  const components = { Money: <MoneyImage /> };
  props[1] = { values, components };
  cards[1] = convertCards([misfortune]);
  if (Exhibit) {
    exhibits[1] = [Exhibit];
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    cards,
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

export default DoremyPortal;