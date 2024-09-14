import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStatusEffectImage } from 'utils/functions/getImage';

function StatusEffectsWidget({ statusEffects }: { statusEffects: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        const text = t(statusEffect, { ns: 'statusEffects' });

        return (
          <span className="c-status-effect" data-name={text} key={i}>
            <LazyLoadImage2 callback={getStatusEffectImage} name={statusEffect} alt={text} />
          </span>
        );
      })}
    </div>
  );
}

export default StatusEffectsWidget;