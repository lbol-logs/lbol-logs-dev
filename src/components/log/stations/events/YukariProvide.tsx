import { configsData } from 'configs/globals';
import { getNext } from 'utils/functions/helpers';
import { SpecialExhibit, TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useTranslation } from 'react-i18next';

function YukariProvide({ station }: { station: TStation }) {
  const { dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Choices } = station.Data;

  const id = 'YukariProvide';
  const title = t(`${id}.Title`, { ns: 'events' });
  const exhibits = [[SpecialExhibit.WaijieYanshuang.toString(), SpecialExhibit.JingjieGanzhiyi.toString()]];

  const configs = dialoguesConfigs.get(id);
  const { current, next: _next } = configs;
  const [next] = getNext(_next);
  const chosen = Choices[0] === 2 ? 1 : Choices[0];

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    exhibits
  };

  return (
    <div className="p-gap-little-chat">
      <p className="p-gap-little-chat__title">
        <span className="p-gap-little-chat__text">{title}</span>
      </p>
      <div className="p-dialogues">
        <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
      </div>
    </div>
  )
}

export default YukariProvide;