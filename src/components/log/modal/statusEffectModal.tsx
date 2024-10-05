import { TStatusEffect } from 'utils/types/runData';
import StatusEffectWidget from '../stations/battleDetails/parts/statusEffectWidget';
import { useTranslation } from 'react-i18next';
import DescriptionWidget from './descriptionWidget';
import { getEntityNs } from 'utils/functions/helpers';

function StatusEffectModal({ statusEffect }: { statusEffect: TStatusEffect }) {
  const { t } = useTranslation();

  const { Id } = statusEffect;
  const [ns] = getEntityNs({ statusEffect });

  return (
    <div className="p-modal__status-effect">
      <div className="p-modal__line">
        <StatusEffectWidget statusEffect={statusEffect} />
        <span className="p-modal__name">{t(`${Id}.Name`, { ns })}</span>
      </div>
      <div className="p-modal__body">
        <DescriptionWidget entityObj={{ statusEffect }} />
      </div>
    </div>
  );
}

export default StatusEffectModal;