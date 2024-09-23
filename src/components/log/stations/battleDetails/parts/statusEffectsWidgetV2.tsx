import { TStatusEffects } from 'utils/types/runData';
import StatusEffectWidget from './statusEffectWidget';

function StatusEffectsWidgetV2({ statusEffects }: { statusEffects: TStatusEffects }) {
  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        return (
          <StatusEffectWidget statusEffect={statusEffect} key={i} />
        )
      })}
    </div>
  );
}

export default StatusEffectsWidgetV2;