import { TCardMana } from 'utils/types/others';
import CardManaWidget from './cardManaWidget';
import CMana from 'utils/classes/CMana';

function CardManasWidget({ cardMana, is2x }: { cardMana: TCardMana | string | number, is2x?: boolean }) {
  const manas = ['string', 'number'].includes(typeof cardMana) ? CMana.get(cardMana as string | number) : (cardMana as TCardMana);

  return (
    <div className="p-card-mana">
    {manas.map((mana, i) => {
      return (
        <CardManaWidget mana={mana} is2x={is2x} key={i} />
      );
    })}
    </div>
  );
}

export default CardManasWidget;