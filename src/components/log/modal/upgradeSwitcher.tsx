import { TDispatch } from 'utils/types/common';

function UpgradeSwitcher({ upgraded, setUpgraded }: { upgraded: boolean, setUpgraded: TDispatch<boolean> }) {
  function onChange() {
    setUpgraded(!upgraded);
  }

  return (
    <div className="p-card__upgrade-switcher c-card__center">
      <label className="c-upgrade-switcher">
        <input className="c-upgrade-switcher__toggle" type="checkbox" defaultChecked={upgraded} onChange={onChange} />
        <span className="c-upgrade-switcher__text">Upgrade</span>
      </label>
    </div>
  );
}

export default UpgradeSwitcher;