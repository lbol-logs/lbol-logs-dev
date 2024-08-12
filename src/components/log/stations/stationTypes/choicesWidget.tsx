import choiceDialogues from 'configs/choiceDialogues';
import { TChoice } from 'utils/types/others';

function ChoicesWidget({ id, choices }: { id: string, choices: Array<TChoice> }) {
  // TODO

  return (
    <div className="p-choices">
      {choices.map((choice, i) => {
        const dialogue = choiceDialogues[id][i][choice];
        return (
          <div className="p-choice">
            {dialogue}
          </div>
        );
      })}
    </div>
  );
}

export default ChoicesWidget;