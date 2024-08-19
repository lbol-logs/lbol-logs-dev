import { TRewards, TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';

function BattleStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { Data, Id, Rewards } = station;
  const { Money, Cards, Exhibits } = Rewards as TRewards || {};
  const { t } = useTranslation();

  let money = null;
  let cards = null;
  let exhibits = null;

  const enemies = configsData.enemyGroups[Id as string];

  const { Rounds } = Data;

  if (Rewards) {
    money = (
      <span className="c-rewards__money">
        <LazyLoadImage2 callback={getCommonImage} name={'Money'} alt={t('money', { ns: 'log' })} />
        {Money}
      </span>
    );

    cards = (
      <>
        {Cards.map((cards, i) => {
          return (
            <div className="c-rewards c-rewards--cards" key={i}>
              <div className="c-rewards__icon">
                <LazyLoadImage2 callback={getCommonImage} name={'Card'} alt={t('card', { ns: 'common' })} />
              </div>
              <CardCards cards={cards} />
            </div>
          );
        })}
      </>
    );

    if (Exhibits) {
      exhibits = (
        <div className="c-rewards c-rewards--exhibits">
          <div className="c-rewards__icon">
            <LazyLoadImage2 callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} />
        </div>
      );
    }
  }

  return (
    <>
      <EnemyCards enemies={enemies} />
      <div className="c-rewards">
        <RoundsWidget rounds={Rounds} />
        {money}
      </div>
      {cards}
      {exhibits}
    </>
  );
}

export default BattleStation;