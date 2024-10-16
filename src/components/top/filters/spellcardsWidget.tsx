import { ChangeEventHandler, useContext } from 'react';
import { RunListContext } from 'contexts/runListContext';
import SpellcardWidget from './spellcardWidget';
import { configsData } from 'configs/globals';
import ModOption from './modOption';
import { toggleIsChecked } from 'utils/functions/helpers';
import { getModdedCharacters } from './charactersWidget';

function SpellcardsWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { charactersConfigs } = configsData;
  const { filter } = useContext(RunListContext);
  const { ch, sc } = filter;

  const character = 'Mods';
  const moddedCharacters = getModdedCharacters({ characters, ch });
  const isCharacterChecked = ch ? (!ch.length || ch.includes(character) || moddedCharacters.length > 0) : true;
  const playerTypes = ['A', 'B'];

  return (
    <>
      {characters.map(character => {
        const isCharacterChecked = ch ? (!ch.length || ch.includes(character)) : true;
        const playerTypes = Object.keys(charactersConfigs.get(character)).filter(key => key !== 'BaseMana');

        return (
          <div className={`p-filter__character-spellcards ${isCharacterChecked ? 'p-filter__character-spellcards--visible' : ''}`} key={character}>
            {playerTypes.map(playerType => {
              const spellcard = character + playerType;
              const isSpellcardChecked = sc ? sc.includes(spellcard) && isCharacterChecked : false;

              return (
                <SpellcardWidget key={spellcard} onChange={onChange} spellcard={spellcard} checked={isSpellcardChecked} />
              );
            })}
          </div>
        );
      })}
      <div className={`p-filter__character-spellcards ${isCharacterChecked ? 'p-filter__character-spellcards--visible' : ''}`} key={character}>
        {playerTypes.map(type => {
          const spellcard = `Mod${type}`;
          const isSpellcardChecked = sc ? sc.includes(spellcard) && isCharacterChecked : false;

          return (
            <label className={`p-filter__toggle ${toggleIsChecked(isSpellcardChecked)} u-button`} key={spellcard}>
              <ModSpellcardWidget type={type} />
              <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="sc" value={spellcard} checked={isSpellcardChecked} />
            </label>
          );
        })}
      </div>
    </>
  );
}

export default SpellcardsWidget;

function ModSpellcardWidget({ type }: { type: string }) {
  return (
    <ModOption><>Mod<br />{type}</></ModOption>
  );
}

export {
  ModSpellcardWidget
};