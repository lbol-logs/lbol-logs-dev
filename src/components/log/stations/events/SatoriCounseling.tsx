import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import CharacterShortName from '../parts/characterShortName';

function SatoriCounseling({ station }: { station: TStation }) {
  const { dialoguesConfigs } = configsData;

  const { Data, Id } = station;

  const { Choices, Values, HasMoney } = Data;

  const id = Id as string;
  const configs = dialoguesConfigs.get(id);

  let first = null;
  let second = null;
  let third = null;

  {
    const { current, next: options } = configs[0];

    const choices = [HasMoney ? 0 : '0_invalid', 1, 2];

    const [next, invalids] = getNext(options, choices);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    {
      const values = { 0: Values[0] };
      props[0] = { values };
    }
    {
      const values = { 0: Values[1] };
      props[2] = { values };
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
    const chosen = Choices[1];
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
    const chosen = Choices[2];
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