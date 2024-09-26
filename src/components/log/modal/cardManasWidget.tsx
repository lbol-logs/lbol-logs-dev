import { TCardMana } from 'utils/types/others';
import CardManaWidget from './cardManaWidget';
import CMana from 'utils/classes/CMana';

function CardManasWidget({ cardMana }: { cardMana: TCardMana }) {
  const { manas } = new CMana(cardMana);

  return (
    <div className="p-card-mana">
    {manas.map((mana, i) => {
      return (
        <CardManaWidget mana={mana} key={i} />
      );
    })}
    </div>
  );
}

export default CardManasWidget;