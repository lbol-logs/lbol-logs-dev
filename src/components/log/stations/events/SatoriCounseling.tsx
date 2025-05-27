import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getChosen, getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import CharacterShortName from '../parts/characterShortName';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function SatoriCounseling({ station }: { station: TStation }) {
  const { runData: { Settings: { Character } } } = useContext(LogContext);
  const { eventsConfigs, dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  if (!Data) return null;

  const { Choices, Values } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;
  let third = null;

  {
    const isKoishi = Character === 'Koishi';
    const config = configs[0];

    const { next: options } = config;
    const { heal } = eventsConfigs.get(id);

    const currentKoishi = config.current_Koishi;
    const current = isKoishi ? currentKoishi : config.current;

    const choices: Array<number | string> = [heal];
    if (isKoishi) {
      choices.unshift(2);
    }
    else {
      const { HasMoney } = Data;
      choices.unshift(1);
      choices.unshift(HasMoney ? 0 : '0_invalid');
    }

    const [next, invalids] = getNext(options, choices);
    const chosen = getChosen(Choices, 0, choices);

    const props: Array<TObjAny> = [];

    {
      const values = { 0: Values[0] };
      props[0] = { values };
    }
    {
      const values = { 0: Values[1] };
      props[choices.length - 1] = { values };
    }

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      invalids
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = getChosen(Choices, 1);
    if (chosen !== undefined) {
        const { current, next: options } = configs[1];

        const [next] = getNext(options);

        const props: Array<TObjAny> = [];

        const components = { PlayerName: <CharacterShortName /> };
        props[0] = { components };

        const dialogueConfigs: TDialogueConfigs = {
          current,
          next,
          chosen,
          props
        };

        second = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
    }
  }

  {
    const chosen = getChosen(Choices, 2);;
    if (chosen !== undefined) {
        const { current, next: options } = configs[2];

        const [next] = getNext(options);

        const dialogueConfigs: TDialogueConfigs = {
          current,
          next,
          chosen
        };

        third = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {first}
              {second}
              {third}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default SatoriCounseling;