import { TStatusEffect } from 'utils/types/runData';
import StatusEffectWidget from '../stations/battleDetails/parts/statusEffectWidget';
import { useTranslation } from 'react-i18next';
import DescriptionWidget from './descriptionWidget';

function StatusEffectModal({ statusEffect }: { statusEffect: TStatusEffect }) {
  const { t } = useTranslation();
  const { Id } = statusEffect;

  return (
    <div className="p-modal__status-effect">
      <div className="p-modal__line">
        <StatusEffectWidget statusEffect={statusEffect} />
        <span className="p-modal__name">{t(`${Id}.Name`, { ns: 'statusEffects' })}</span>
      </div>
      <div className="p-modal__body">
        <DescriptionWidget ns="statusEffects" {...statusEffect} />
      </div>
    </div>
  );
}

export default StatusEffectModal;