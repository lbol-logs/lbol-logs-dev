import { TCardMana } from 'utils/types/others';
import CardManaWidget from './cardManaWidget';
import { useTranslation } from 'react-i18next';

function CardManasWidget({ cardMana, is2x }: { cardMana: TCardMana, is2x?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="p-card-mana">
    {cardMana.map((mana, i) => {
      return (
        <CardManaWidget mana={mana} is2x={is2x} key={i} />
      );
    })}
    </div>
  );
}

export default CardManasWidget;