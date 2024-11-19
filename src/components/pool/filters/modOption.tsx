import CharacterImage from 'components/common/parts/characterImage';

function ModOption({ children }: { children: JSX.Element | string }) {
  const character = 'Mod';

  return (
    <span className="p-filter__mod">
      <CharacterImage className="p-filter__mod-icon" character={character} />
      <span className="p-filter__mod-text">{children}</span>
    </span>
  );
}

export default ModOption;