import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStatusEffectImage } from 'utils/functions/getImage';
import { getEntityNs } from 'utils/functions/helpers';

function StatusEffectsWidgetV1({ statusEffects }: { statusEffects: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        const [ns, isMod] = getEntityNs({ statusEffect: { Id: statusEffect } });
        const alt = t(`${statusEffect}.Name`, { ns });

        return (
          <span className="c-status-effect" data-name={alt} key={i}>
            <LazyLoadImage2 callback={getStatusEffectImage} name={statusEffect} alt={alt} isMod={isMod} />
          </span>
        );
      })}
    </div>
  );
}

export default StatusEffectsWidgetV1;