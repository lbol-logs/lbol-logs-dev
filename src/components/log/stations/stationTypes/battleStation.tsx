import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import EnemyCards from '../parts/enemyCards';
import RoundsWidget from '../parts/roundsWidget';

function BattleStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { Type, Data, Id, Rewards } = station;
  const { t } = useTranslation();

  let enemies, Enemies;
  let money = null;
  let cards = null;
  let exhibits = null;

  if (Type === 'Enemy') ({ Enemies } = configsData.enemyGroups[Id as string]);
  else Enemies = [Id as string];
  enemies = <EnemyCards enemies={Enemies} />;

  const { Rounds } = Data;

  if (Rewards) {
    const { Money, Cards, Exhibits } = Rewards;

    money = (
      <span className="c-rewards__money">
        <LazyLoadImage src={getCommonImage('Money')} width={iconSize} height={iconSize} alt={t('money', { ns: 'log' })} />
        {Money}
      </span>
    );

    cards = (
      <>
        {Cards.map((cards, i) => {
          return (
            <div className="c-rewards c-rewards--cards" key={i}>
              <div className="c-rewards__icon">
                <LazyLoadImage src={getCommonImage('Card')} width={iconSize} height={iconSize} alt={t('card', { ns: 'common' })} />
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
            <LazyLoadImage src={getCommonImage('Exhibit')} width={iconSize} height={iconSize} alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} />
        </div>
      );
    }
  }

  return (
    <>
      {enemies}
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