import { TStatusEffect } from 'utils/types/runData';
import StatusEffectWidget from '../stations/battleDetails/parts/statusEffectWidget';
import { useTranslation } from 'react-i18next';

function StatusEffectModal({ statusEffect }: { statusEffect: TStatusEffect }) {
  const { t } = useTranslation();
  const { Id, Level, Duration, Count } = statusEffect;
  // TODO
  return (
    <div className="p-modal__status-effect">
      <div className="p-modal__line">
        <StatusEffectWidget statusEffect={statusEffect} />
        <span className="p-modal__name">{t(Id, { ns: 'statusEffects' })}</span>
      </div>
      <div className="p-modal__body">
        a<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        b
      </div>
    </div>
  );
}

export default StatusEffectModal;