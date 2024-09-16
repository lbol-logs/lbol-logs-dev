import { TIntentions } from 'utils/types/runData';

function IntentionsWidget({ intentions }: { intentions: TIntentions }) {
  return (
    <div className="p-intentions">
      {intentions.map((intention, i) => {
        const { Type } = intention;
        let damage = null;
        if ('Damage' in intention) {

        }

        return (
          <div className="p-intention">
            {Type}
          </div>
        );
      })}
    </div>
  );
}

export default IntentionsWidget;