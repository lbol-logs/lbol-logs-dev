import { ChangeEventHandler, useContext } from 'react';
import { RunListContext } from 'contexts/runListContext';
import { CommonContext } from 'contexts/commonContext';
import SpellcardWidget from './spellcardWidget';

function SpellcardsWidget({ onChange, characters }: { onChange: ChangeEventHandler, characters: Array<string> }) {
  const { configsData } = useContext(CommonContext);
  const characterConfigs = configsData.characters;
  const { filter } = useContext(RunListContext);
  const { ch, sc } = filter;

  return (
    <>
      {characters.map(character => {
        const isCharacterChecked = ch ? (!ch.length || ch.includes(character)) : true;
        const playerTypes = Object.keys(characterConfigs[character]).filter(key => key !== 'BaseMana');

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
    </>
  );
}

export default SpellcardsWidget;