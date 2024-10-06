import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { TComponents, TObjAny } from 'utils/types/common';
import { getNext, getNs } from 'utils/functions/helpers';
import { configsData } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import CharacterImage from 'components/common/parts/characterImage';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';

function SelectOpponent({ station }: { station: TStation }) {
  const { runData: { Acts } } = useContext(LogContext);
  const { eventsConfigs, dialoguesConfigs } = configsData;
  const { t } = useTranslation();

  const { Data } = station;
  const { Choices, Opponents } = Data;

  const id = 'SelectOpponent';
  const { power } = eventsConfigs.get(id);
  const configs = dialoguesConfigs.get(id);

  const { current, next: options } = configs;

  const [next] = getNext(options);
  const chosen = Choices[0];

  const props: Array<TObjAny> = [];
  const afters: TComponents = [];

  Opponents.forEach((opponent: string, i: number) => {
    const [ns] = getNs({ ns: 'units', character: opponent });
    const values = { 0: t(opponent, { ns }) };
    props[i] = { values };
  });
  {
    const values = { 0: power };
    props[3] = { values };
    if (chosen === 3) {
      const boss = Acts[0].Boss as string;
      afters[3] = (
        <>
          <CharacterImage character={boss} />
          <span>{t(boss, { ns: 'units' })}</span>
        </>
      );
    }
  }

  const dialogueConfigs: TDialogueConfigs = {
    current,
    next,
    chosen,
    props,
    afters
  };

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <div className="p-event__body">
            <div className="p-dialogues">
              <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectOpponent;