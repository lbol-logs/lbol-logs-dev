import { TStatusEffects } from 'utils/types/runData';
import StatusEffectWidget from './statusEffectWidget';

function StatusEffectsWidgetV2({ statusEffects, owner }: { statusEffects: TStatusEffects, owner: string }) {
  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        Object.assign(statusEffect, { owner });

        return (
          <StatusEffectWidget statusEffect={statusEffect} key={i} />
        )
      })}
    </div>
  );
}

export default StatusEffectsWidgetV2;