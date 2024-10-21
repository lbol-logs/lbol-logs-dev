import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { configsData, iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getUnitImage } from 'utils/functions/getImage';
import { getNs } from 'utils/functions/helpers';
import { TObjString } from 'utils/types/common';

const models: TObjString = {
  RavenWen3: 'RavenWen',
  RavenGuo3: 'RavenGuo'
};

function EnemyCards({ id }: { id: string }) {
  const { t, i18n } = useTranslation();

  const size = iconSize * 2;
  const { enemyGroupsConfigs } = configsData;
  const enemies: Array<string> = enemyGroupsConfigs.get(id);

  let inner;

  if (enemies) {
    inner = enemies.map((enemy, i) => {
      const name = models[enemy] || enemy;
      let ns = 'units';
      let isMod = false;
      if (!i18n.exists(name, { ns })) {
        isMod = true;
        [ns] = getNs({ ns, isMod });
      }
      const text = t(name, { ns });

      return (
        <div className="p-enemy" key={i}>
          <LazyLoadImage2 className="p-enemy__img" callback={getUnitImage} name={name} width={size} height={size} alt="" isMod={isMod} />
          <span className="p-enemy__text">{text}</span>
        </div>
      );
    });
  }
  else {
    inner = (
      <div className="p-enemy">
        <LazyLoadImage2 className="p-enemy__img" callback={getUnitImage} name="Unknown" width={size} height={size} alt="" />
        <span className="p-enemy__text">{id}</span>
      </div>
    );
  }

  return (
    <div className="p-enemies">
      {inner}
    </div>
  );
}

export default EnemyCards;