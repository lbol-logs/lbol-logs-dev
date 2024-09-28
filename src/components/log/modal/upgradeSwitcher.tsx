import { useTranslation } from 'react-i18next';
import { TDispatch } from 'utils/types/common';

function UpgradeSwitcher({ upgraded, setUpgraded }: { upgraded: boolean, setUpgraded: TDispatch<boolean> }) {
  const { t } = useTranslation();

  function onChange() {
    setUpgraded(!upgraded);
  }

  return (
    <div className="p-card__upgrade-switcher c-card__center">
      <label className="c-upgrade-switcher">
        <input className="c-upgrade-switcher__toggle" type="checkbox" defaultChecked={upgraded} onChange={onChange} />
        <span className="c-upgrade-switcher__text">{t('Upgrade', { ns: 'log' })}</span>
      </label>
    </div>
  );
}

export default UpgradeSwitcher;