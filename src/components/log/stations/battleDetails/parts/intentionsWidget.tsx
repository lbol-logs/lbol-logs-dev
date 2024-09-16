import { TIntentions, TIntentionWithDamage } from 'utils/types/runData';

function IntentionsWidget({ intentions }: { intentions: TIntentions }) {
  return (
    <div className="p-intentions">
      {intentions.map((intention, i) => {
        const { Type, Damage } = intention as TIntentionWithDamage;
        let damage = null;
        if (Damage !== undefined) {

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