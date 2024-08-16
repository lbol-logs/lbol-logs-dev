import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TChoice } from 'utils/types/others';

function ChoicesWidget({ id, choices }: { id: string, choices: Array<TChoice> }) {
  const { t } = useTranslation();
  const { configsData } = useContext(LogContext);
  const dialogueConfigs = configsData.dialogues;
  let current = dialogueConfigs[id];

  return (
    <div className="p-choices">
      {choices.map((choice, i) => {
        // TODO
        let dialogue;
        if (current) {
          const { line, next } = current[choice];
          current = next;
          dialogue = t(`${id}.${line}`, { ns: 'dialogues' });
        }
        else {
          // TODO: remove
          dialogue = `Choice #${i + 1}: ${choice}`;
        }

        return (
          <div className="p-choice" key={i}>
            {dialogue}
          </div>
        );
      })}
    </div>
  );
}

export default ChoicesWidget;