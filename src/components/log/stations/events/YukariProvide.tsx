import ExhibitImage from 'components/common/parts/exhibitImage';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { getNext } from 'utils/functions/helpers';
import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useTranslation } from 'react-i18next';

function YukariProvide({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Choices } = station.Data;

  const id = 'YukariProvide';
  const title = t(`${id}.Title`, { ns: 'events' });
  const exhibit1 = 'JingjieGanzhiyi';
  const exhibit2 = 'WaijieYanshuang';

  const configs = configsData.dialogues[id];
  const { current, next: _next } = configs;
  const [next] = getNext(_next);
  const chosen = Choices[0] === 2 ? 1 : Choices[0];

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen
  };

  return (
    <div className="p-gap-little-chat">
      <p className="p-gap-little-chat__title">
        <ExhibitImage className="p-gap-little-chat__exhibit-1" exhibit={exhibit1} />
        <ExhibitImage className="p-gap-little-chat__exhibit-2" exhibit={exhibit2} />
        <span className="p-gap-little-chat__text">{title}</span>
      </p>
      <div className="p-dialogues">
        <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
      </div>
    </div>
  )
}

export default YukariProvide;