import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { copyObject, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { TComponents, TObjAny } from 'utils/types/common';

function BackgroundDancers({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices, Hp, Options, Tools, Exhibits, Abilities } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  const { current, next: options } = configs[0];
  const { money, power, maxhp } = eventConfigs;

  const dialogues: TComponents = [];
  const choices = Options.slice(0, 3);
  // choices[3] = 
  
  for (let i = 0; i < Choices.length; i++) {
    const [next] = getNext(options, choices);
    const chosen = Choices[i];
  console.log(i, choices);
    const props: Array<TObjAny> = [];
  
    // {
    //   const values = { 0: Values[0], 1: money };
    //   props[0] = { values };
    // }
    // {
    //   const values = { 0: Values[1] };
    //   props[1] = { values };
    // }
  
    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    dialogues.push(<DialogueWidget id={id} dialogueConfigs={dialogueConfigs} key={i} />);

    choices[chosen] = Options[3 + i];
  }


  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {dialogues}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default BackgroundDancers;