import DialogueWidget from 'components/log/stations/parts/dialogueWidget';
import { convertCards, copyObject, getChosen, getNext } from 'utils/functions/helpers';
import { TComponents, TObjAny, TObjNumber } from 'utils/types/common';
import { TCards, TDialogueConfigs, TExhibits } from 'utils/types/runData';

function usePrismriverChaos({ id, Data, configs }: { id: string, Data: TObjAny, configs: TObjAny }) {
  if (!Data) return;
  const { Choices, Hps, Cards } = Data;

  const dialogues: TComponents = [];

  function appendDialogue(i: number, current: string, next: string[]) {
    const chosen = getChosen(Choices, i);

    const { Id, IsUpgraded } = Cards[i]

    const props: Array<TObjAny> = [];
    const cards: Array<TCards> = [];

    const values = { 0: Hps[i] };
    props[1] = { values };
    cards[0] = convertCards([Id], IsUpgraded);

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props,
      cards
    };

    dialogues.push(<DialogueWidget id={id} dialogueConfigs={dialogueConfigs} key={i} />);
  }

  {
    const { current, next: options } = configs[0];

    const [next] = getNext(options);
    appendDialogue(0, current, next);
  }
  if (Hps.length > 1) {
    const { current, next: options } = configs[1];

    const [next] = getNext(options);
    for (let i = 1; i < Hps.length; i++) appendDialogue(i, current, next);
  }

  return dialogues;
}

export default usePrismriverChaos;