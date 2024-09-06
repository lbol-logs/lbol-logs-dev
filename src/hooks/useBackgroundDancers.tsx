import DialogueWidget from 'components/log/stations/parts/dialogueWidget';
import { convertCards, copyObject, getNext } from 'utils/functions/helpers';
import { TComponents, TObjAny, TObjNumber } from 'utils/types/common';
import { TCards, TDialogueConfigs, TExhibits } from 'utils/types/runData';

function useBackgroundDancers({ id, Data, configs, eventConfigs }: { id: string, Data: TObjAny, configs: TObjAny, eventConfigs: TObjAny }) {
  const { Choices, Hp, Options, Tools, Exhibits, Abilities } = Data;

  const { current: _current, next: _next } = configs[0];
  const { money, power, maxhp } = eventConfigs;

  const dialogues: TComponents = [];

  const options = {
    0: Options[0],
    1: Options[1],
    2: Options[2],
    3: 'leave'
  };

  let current = _current;
  const Hp2 = Hp * 2;
  let pointers: TObjNumber = {
    1: 0,
    4: 0,
    5: 0,
  };

  const choices = Object.values(options);
  let [next] = getNext(_next, choices);
  let chosen = Choices[0];
  let choice;

  let props: Array<TObjAny> = [];
  let cards: Array<TCards> = [];
  let exhibits: Array<TExhibits> = [];

  function handleOption(i: number, option: number | string) {
    let values;
    switch (option) {
      case 0: {
        values = { 0: Hp, 1: money };
        break;
      }
      case 1: {
        values = { 0: Hp2 };
        if (Tools) cards[i] = convertCards(Tools[pointers[option]]);
        break;
      }
      case 2: {
        values = { 0: Hp, 1: maxhp };
        break;
      }
      case 3: {
        values = { 0: Hp, 1: power };
        break;
      }
      case 4: {
        values = { 0: Hp2 };
        if (Exhibits) exhibits[i] = [Exhibits[pointers[option]]];
        break;
      }
      case 5: {
        values = { 0: Hp };
        if (Abilities) cards[i] = convertCards([Abilities[pointers[option]]]);
        break;
      }
      case 'leave': {
        values = { 0: Hp };
        break;
      }
    }
    props[i] = { values };
  }

  choices.forEach((option, i) => handleOption(i, option));

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    cards,
    exhibits
  };

  dialogues.push(<DialogueWidget id={id} dialogueConfigs={dialogueConfigs} key={0} />);

  const len = Choices.length;
  if (len > 1) {

    for (let i = 1; i < len; i++) {
      next = copyObject(next)
      props = copyObject(props);
      cards = copyObject(cards);
      exhibits = copyObject(exhibits);
      delete props[chosen];
      delete cards[chosen];
      delete exhibits[chosen];

      choice = choices[chosen];
      current = configs[1][choice];

      if ([1, 4, 5].includes(choice)) {
        pointers = copyObject(pointers);
        pointers[choice]++;
      }
      const option = Options[2 + i];
      handleOption(chosen, option);

      choices[chosen] = option;
      const [nextLine] = getNext(_next, [option]);
      next[chosen] = nextLine[0];
      chosen = Choices[i];
    
      const dialogueConfigs: TDialogueConfigs = {
        current,
        next,
        chosen,
        props,
        cards,
        exhibits
      };

      dialogues.push(<DialogueWidget id={id} dialogueConfigs={dialogueConfigs} key={i} />);

      Object.assign(options, { [chosen]: Options[3 + i] });
    }
  }
  
  return dialogues;
}

export default useBackgroundDancers;