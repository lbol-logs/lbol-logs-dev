import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getUnitImage } from 'utils/functions/getImage';
import { getNs } from 'utils/functions/helpers';
import { TObjString } from 'utils/types/common';

const models: TObjString = {
  RavenWen3: 'RavenWen',
  RavenGuo3: 'RavenGuo'
};

function EnemyCards({ enemies }: { enemies: Array<string> }) {
  const { t, i18n } = useTranslation();

  const size = iconSize * 2;

  return (
    <div className="p-enemies">
      {enemies.map((enemy, i) => {
        const name = models[enemy] || enemy;
        let ns = 'units';
        if (!i18n.exists(name, { ns })) {
          [ns] = getNs({ ns, isMod: true });
        }
        const text = t(name, { ns });

        return (
          <div className="p-enemy" key={i}>
            <LazyLoadImage2 className="p-enemy__img" callback={getUnitImage} name={name} width={size} height={size} alt="" />
            <span className="p-enemy__text">{text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default EnemyCards;