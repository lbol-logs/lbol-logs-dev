import { RequestTypes, TDialogueConfigs, TStation } from 'utils/types/runData';
import { getEnemyImage } from 'utils/functions/getImage';
import { iconSize } from 'configs/globals';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { applyRate, convertCard, convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import EventHead from '../parts/eventHead';
import { MoneyImage, PowerImage } from '../parts/stationWidgets';
import ExhibitCard from 'components/log/entityCards/exhibitCard';
import CardCards from 'components/log/entityCards/cardCards';
import CardCard from 'components/log/entityCards/cardCard';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { CommonContext } from 'contexts/commonContext';
import RewardsWidget from '../parts/rewardsWidget';

function EntryStation({ station }: { station: TStation }) {
  const { configsData: { requests: requestConfigs } } = useContext(CommonContext);
  const { runData, configsData } = useContext(LogContext);
  const { HasClearBonus, Requests } = runData.Settings;

  const { Data } = station;

  if (!Data) return null;

  const { Choices, Options } = Data;

  const id = 'Debut';
  const eventConfigs = configsData.events[id];
  const configs = configsData.dialogues[id];

  let advantages = null;
  let pills = null;
  let secretTreasures = null;

  {
    const { current, next: _next } = configs[0];

    let options = {
      0: 0
    };
    if (HasClearBonus && Options) {
      options = Object.assign(options, {
        1: 1,
        2: Options[0] + 2,
        3: Options[1] + 2
      });
    }
    const choices = Object.values(options);
    const next = getNext(_next, choices);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];
    const randoms: Array<JSX.Element> = [];

    Object.entries(options).forEach(([key, option]) => {
      const i = Number(key);
      switch (option) {
        case 0: {
            const values = { 0: eventConfigs.money };
            const components = { Money: <MoneyImage /> };
            props[i] = { values, components };
            break;
        }
        case 1: {
          const { Shining } = Data;
          if (!Shining) break;
          const random = <ExhibitCard exhibit={Shining} />
          randoms[i] = random;
          break;
        }
        case 2: {
          const { UncommonCards } = Data
          if (!UncommonCards) break;
          const cards = convertCards(UncommonCards);
          const random = <CardCards cards={cards} />
          randoms[i] = random;
          break;
        }
        case 3: {
          const { RareCard } = Data;
          if (!RareCard) break;
          const card = convertCard(RareCard);
          const random = <CardCard card={card} />
          randoms[i] = random;
          break;
        }
        case 4: {
          const { RareExhibit } = Data;
          if (!RareExhibit) break;
          const random = <ExhibitCard exhibit={RareExhibit} />
          randoms[i] = random;
          break;
        }
        case 5: {
          break;
        }
        case 6: {
          break;
        }
        case 7: {
          const { TransformCard } = Data;
          if (!TransformCard) break;
          const card = convertCard(TransformCard);
          const random = <CardCard card={card} />
          randoms[i] = random;
          break;
        }
      }
    });

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      randoms
    };

    advantages = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const { red, blue } = eventConfigs;
    const { current, next: options } = configs[1];

    const next = getNext(options);
    const chosen = Choices[1];

    const props: Array<TObjAny> = [];

    const HalfDrug = RequestTypes.HalfDrug.toString();
    const x = Requests.includes(HalfDrug) ? requestConfigs[HalfDrug] : 1;

    Object.keys(options).forEach(key => {
      const i = Number(key);
      switch (i) {
        case 0: {
            const values = { 0: applyRate(red, x) };
            const components = { Power: <PowerImage /> };
            props[i] = { values, components };
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
      const { current, next: options } = configs[2];
      const next = getNext(options);

      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
      };

      const size = iconSize * 2;

      secretTreasures = (
        <>
          <LazyLoadImage2 className="p-event__img" callback={getEnemyImage} name="Kaguya" width={size} height={size} alt="" />
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
          <EventHead id={id} callback={getEnemyImage} name="Eirin" />
          <div className="p-event__body">
            {choices}
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default EntryStation;