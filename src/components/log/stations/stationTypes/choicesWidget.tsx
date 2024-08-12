import choiceDialogues from 'configs/choiceDialogues';
import { useTranslation } from 'react-i18next';
import { TChoice } from 'utils/types/others';

function ChoicesWidget({ id, choices }: { id: string, choices: Array<TChoice> }) {
  const { t } = useTranslation();

  let current = choiceDialogues[id];

  return (
    <div className="p-choices">
      {choices.map((choice, i) => {
        // TODO
        // const { line, next } = current[choice];
        // current = next;
        const line = ''

        return (
          <div className="p-choice" key={i}>
            {t(`${id}.${line}`, { ns: 'eventDialogures' })}
          </div>
        );
      })}
    </div>
  );
}

export default ChoicesWidget;