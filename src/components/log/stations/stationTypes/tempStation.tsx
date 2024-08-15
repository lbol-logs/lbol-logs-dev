import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import RoundsWidget from '../parts/roundsWidget';

function TempStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards } = station;
  const { t } = useTranslation();

  let data = null;
  let choices = null;
  let rounds = null;
  let money = null;
  let cards = null;
  let exhibits = null;

  if (Data) {
    const { Choices, Rounds } = Data;

    if (Choices) {
      choices = (
        <p>
          {Choices.join(', ')}
        </p>
      );
    }

    if (Rounds) {
      rounds = <RoundsWidget rounds={Rounds} />;
    }
  }
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

  data = (
    <>
      {choices}
      <div className="c-rewards">
        {rounds}
        {money}
      </div>
      {cards}
      {exhibits}
    </>
  );

  return (
    <>
      {Id && (
        <p>{Id}</p>
      )}
      {data}
    </>
  );
}

export default TempStation;