import { RequestType, TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import { getUnitImage } from 'utils/functions/getImage';
import { configsData, iconSize } from 'configs/globals';
import DialogueWidget from '../parts/dialogueWidget';
import { TObj, TObjAny } from 'utils/types/common';
import { applyRate, convertCards, getNext } from 'utils/functions/helpers';
import EventHead from '../parts/eventHead';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import RewardsWidget from '../parts/rewardsWidget';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function Debut({ station }: { station: TStation }) {
  const { requestsConfigs, eventsConfigs, dialoguesConfigs } = configsData;
  const { runData: { Settings } } = useContext(LogContext);
  const { HasClearBonus, Requests } = Settings;

  const { Data } = station;

  const { Choices, Options } = Data;

  const id = 'Debut';
  const { money } = eventsConfigs.get(id);
  const configs = dialoguesConfigs.get(id);

  let advantages = null;
  let pills = null;
  let secretTreasures = null;

  {
    const { current, next: _next } = configs[0];

    const options: TObj<string | number> = {
      0: 'money'
    };
    if (HasClearBonus && Options) {
      const { JadeBoxes } = Settings;
      const shining = 'shining' + ((JadeBoxes && JadeBoxes.includes('TwoColorStart')) ? '_invalid' : '');
      Object.assign(options, {
        1: shining,
        2: Options[0],
        3: Options[1]
      });
    }
    const choices = Object.values(options);
    const [next, invalids] = getNext(_next, choices);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];
    const cards: Array<TCards> = [];
    const exhibits: Array<TExhibits> = [];

    Object.entries(options).forEach(([key, option]) => {
      const i = Number(key);
      switch (option) {
        case 'money': {
            const values = { 0: money };
            props[i] = { values };
            break;
        }
        case 'shining': {
          const { Shining } = Data;
          if (!Shining) break;
          exhibits[i] = [Shining];
          break;
        }
        case 0: {
          const { UncommonCards } = Data
          if (!UncommonCards) break;
          cards[i] = convertCards(UncommonCards);
          break;
        }
        case 1: {
          const { RareCard } = Data;
          if (!RareCard) break;
          cards[i] = convertCards([RareCard]);
          break;
        }
        case 2: {
          const { RareExhibit } = Data;
          if (!RareExhibit) break;
          exhibits[i] = [RareExhibit];
          break;
        }
        case 3: {
          break;
        }
        case 4: {
          break;
        }
        case 5: {
          const { TransformCard } = Data;
          if (!TransformCard) break;
          cards[i] = convertCards([TransformCard]);
          break;
        }
      }
    });

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      invalids,
      cards,
      exhibits
    };

    advantages = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const { red, blue } = eventsConfigs.get(id);
    const { current, next: options } = configs[1];

    const [next] = getNext(options);
    const chosen = Choices[1];

    const props: Array<TObjAny> = [];

    const HalfDrug = RequestType.HalfDrug;
    const x = Requests.includes(HalfDrug) ? requestsConfigs.get(HalfDrug) : 1;

    Object.keys(options).forEach(key => {
      const i = Number(key);
      switch (i) {
        case 0: {
            const values = { 0: applyRate(red, x) };
            props[i] = { values };
            break;
        }
        case 1: {
          const values = { 0: applyRate(blue, x) };
          props[i] = { values };
          break;
        }
      }
    });

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    pills = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[2];
    if (chosen !== undefined) {
      const { exhibits: _exhibits } = eventsConfigs.get(id);

      const { current, next: options } = configs[2];
      const [next] = getNext(options);

      const exhibits: Array<TExhibits> = _exhibits.map((exhibit: string) => [exhibit]);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      const size = iconSize * 2;

      secretTreasures = (
        <>
          <LazyLoadImage2 className="p-event__img" callback={getUnitImage} name="Kaguya" width={size} height={size} alt="" />
          <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
        </>
      );
    }
  }

  const choices = (
    <div className="p-dialogues">
      {advantages}
      {pills}
      {secretTreasures}
    </div>
  );

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} callback={getUnitImage} name="Eirin" />
          <div className="p-event__body">
            {choices}
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default Debut;