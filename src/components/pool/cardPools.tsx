import CharacterImage from 'components/common/parts/characterImage';
import CardCards from 'components/log/entityCards/cardCards';
import { TCardPool } from 'utils/types/others';

function CardPools({ cardPool }: { cardPool: TCardPool }) {
  return (
    <div className="p-card-pool__card-pools">
      {Object.entries(cardPool).map(([owner, cards]) => {
        return (
          <div className="p-card-pool__card-pool" key={owner}>
            <CharacterImage className="p-card-pool__owner" character={owner} />
            <CardCards cards={cards} />
          </div>
          );
      })}
    </div>
  );
}

export default CardPools;