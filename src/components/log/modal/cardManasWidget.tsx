import { TCardMana } from 'utils/types/others';
import CardManaWidget from './cardManaWidget';

function CardManasWidget({ cardMana }: { cardMana: TCardMana }) {
  return (
    <div className="p-card-mana">
    {cardMana.map((mana, i) => {
      return (
        <CardManaWidget mana={mana} key={i} />
      );
    })}
    </div>
  );
}

export default CardManasWidget;