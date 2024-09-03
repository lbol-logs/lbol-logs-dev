import { TChoice } from 'utils/types/others';

function ChoicesWidget({ id, choices }: { id: string, choices: Array<TChoice> }) {

  // TODO REMOVE
  return (
    <div className="p-choices">
      {choices.map((choice, i) => {
        const dialogue = `Choice #${i + 1}: ${choice}`;

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