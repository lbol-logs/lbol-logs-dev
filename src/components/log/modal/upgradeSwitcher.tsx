import { TDispatch } from 'utils/types/common';

function UpgradeSwitcher({ upgraded, setUpgraded }: { upgraded: boolean, setUpgraded: TDispatch<boolean> }) {
  function onChange() {
    setUpgraded(!upgraded);
  }

  return (
    <div className=" c-card__center">
      <label className="toggleLabel">
        <input className="toggleButton" type="checkbox" defaultChecked={upgraded} onChange={onChange} />
        Upgrade
      </label>
    </div>
  );
}

export default UpgradeSwitcher;