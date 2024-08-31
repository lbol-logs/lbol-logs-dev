import { TCards, TDialogueConfigs, TExhibits, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TComponents, TObjAny } from 'utils/types/common';
import { convertCards, getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { useTranslation } from 'react-i18next';
import BaseManaWidget from 'components/common/parts/baseManaWidget';
import EnemyCards from '../parts/enemyCards';
import { MoneyImage } from '../parts/stationWidgets';
import RoundsWidget from '../parts/roundsWidget';

function MiyoiBartender({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);

  const { Data, Id } = station;

  const { Choices, Ids, Id: enemyGroupId, Exhibit, Rounds } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { exhibit, money, misfortunes } = eventConfigs;

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];
    const cards: Array<TCards> = [];
    const exhibits: Array<TExhibits> = [];
    const afters: TComponents = [];

    exhibits[0] = [exhibit];

    const values = { 0: money };
    const components = { Money: <MoneyImage /> };
    props[1] = { values, components };
    cards[1] = convertCards(misfortunes);

    if (Exhibit) exhibits[2] = [Exhibit];
    afters[2] = Ids.map((id: string, i: number) => {
      const enemies = configsData.enemyGroups[id];

      return <EnemyCards enemies={enemies} key={i} />;
    });

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      cards,
      exhibits,
      afters
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const chosen = Choices[1];
    if (chosen !== undefined) {
      const { current, next: options } = configs[1];
  
      const [next] = getNext(options);
  
      const exhibits: Array<TExhibits> = [];
  
      if (Exhibit) exhibits[0] = [Exhibit];
  
      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        exhibits
      };

      const enemies = configsData.enemyGroups[enemyGroupId];
  
      second = (
        <>
          <EnemyCards enemies={enemies} />
          <div className="c-station__stats">
            <RoundsWidget rounds={Rounds} />
          </div>
          <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
        </>
      );
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
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default MiyoiBartender;