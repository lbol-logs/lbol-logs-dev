import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getEnemyImage } from 'utils/functions/getImage';

function EnemyCards({ enemies }: { enemies: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="p-enemies">
      {enemies.map((enemy, i) => {
        let name: string;
        switch (enemy) {
          case 'RavenWen3':
            name = 'RavenWen';
            break;
          case 'RavenGuo3':
            name = 'RavenGuo';
            break;
          default:
            name = enemy;
            break;
        }

        return (
          <div className="p-enemy" key={i}>
            <LazyLoadImage2 className="p-enemy__img" callback={getEnemyImage} name={name} width={iconSize * 2} height={iconSize * 2} alt="" />
            <span className="p-enemy__text">{t(name, { ns: 'enemies' })}</span>
          </div>
        );
      })}
    </div>
  );
}

export default EnemyCards;