import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStatusEffectImage } from 'utils/functions/getImage';
import { TStatusEffects } from 'utils/types/runData';

function StatusEffectsWidgetV2({ statusEffects }: { statusEffects: TStatusEffects }) {
  const { t } = useTranslation();

  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        const { Id, Level, Duration, Count } = statusEffect;
        const text = t(Id, { ns: 'statusEffects' });

        let level = null;
        let duration = null;
        let count = null;

        if (Level) level = <span className="c-status-effect__value c-status-effect__value--level u-text-shadow">{Level}</span>;
        if (Duration) duration = <span className="c-status-effect__value c-status-effect__value--duration u-text-shadow">{Duration}</span>;
        if (Count) count = <span className="c-status-effect__value c-status-effect__value--count u-text-shadow">{Count}</span>;

        return (
          <span className="c-status-effect" data-name={text} key={i}>
            {level}
            {duration}
            {count}
            <LazyLoadImage2 callback={getStatusEffectImage} name={Id} alt={text} />
          </span>
        );
      })}
    </div>
  );
}

export default StatusEffectsWidgetV2;