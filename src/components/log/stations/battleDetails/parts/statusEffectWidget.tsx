import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getStatusEffectImage } from 'utils/functions/getImage';
import { getEntityNs } from 'utils/functions/helpers';
import { TStatusEffect } from 'utils/types/runData';

function StatusEffectWidget({ statusEffect }: { statusEffect: TStatusEffect }) {
  const { setEntityModal } = useContext(CommonContext);
  const { t } = useTranslation();

  const { Id, Level, Duration, Count } = statusEffect;

  let level = null;
  let duration = null;
  let count = null;

  if (Level !== undefined) level = <span className="c-status-effect__value c-status-effect__value--level u-text-shadow">{Level}</span>;
  if (Duration !== undefined) duration = <span className="c-status-effect__value c-status-effect__value--duration u-text-shadow">{Duration}</span>;
  if (Count !== undefined) count = <span className="c-status-effect__value c-status-effect__value--count u-text-shadow">{Count}</span>;

  function onClick() {
    setEntityModal({ statusEffect });
  }

  const [ns, isMod] = getEntityNs({ statusEffect });

  return (
    <span className="c-status-effect" onClick={onClick}>
      {level}
      {duration}
      {count}
      <LazyLoadImage2 className="c-status-effect__img" callback={getStatusEffectImage} name={Id} alt={t(`${Id}.Name`, { ns })} isMod={isMod} />
    </span>
  );
}

export default StatusEffectWidget;