function BattleDetailsItem({ label, children }: { label: string, children: JSX.Element }) {
  return (
    <div className="p-battle-details__item">
      <div className="p-battle-details__label">{label}</div>
      <div className="p-battle-details__line">
        {children}
      </div>
    </div>
  );
}

export default BattleDetailsItem;