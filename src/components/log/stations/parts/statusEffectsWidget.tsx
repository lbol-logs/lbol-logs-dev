import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getStatusEffectImage } from 'utils/functions/getImage';

function StatusEffectsWidget({ statusEffects, newStatusEffect }: { statusEffects: Array<string>, newStatusEffect: string | undefined }) {
  const { t } = useTranslation();

  return (
    <div className="c-status-effects">
      {statusEffects.map((statusEffect, i) => {
        return <LazyLoadImage2 key={i} callback={getStatusEffectImage} name={statusEffect} alt={t(statusEffect, { ns: 'statusEffects' })} />;
      })}
      {newStatusEffect && (
        <span className="c-entity c-status-effect">
          <LazyLoadImage2 className="c-status-effect__img" callback={getStatusEffectImage} name={newStatusEffect} alt="" />
          <span className="c-entity__text">{t(newStatusEffect, { ns: 'statusEffects' })}</span>
        </span>
      )}
    </div>
  );
}

export default StatusEffectsWidget;