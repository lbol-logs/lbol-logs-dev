import { TDispatch } from 'utils/types/common';

function UpgradeSwitcher({ upgraded, setUpgraded }: { upgraded: boolean, setUpgraded: TDispatch<boolean> }) {
  function onChange() {
    setUpgraded(!upgraded);
  }

  return (
    <div className="p-card__upgrade-switcher c-card__center">
      <div className="c-upgrade-switcher">
        <input id="upgrade" className="c-upgrade-switcher__toggle" type="checkbox" defaultChecked={upgraded} onChange={onChange} />
        <label className="c-upgrade-switcher__text" htmlFor="upgrade">Upgrade</label>
      </div>
    </div>
  );
}

export default UpgradeSwitcher;