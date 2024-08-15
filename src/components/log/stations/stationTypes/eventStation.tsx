import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import ChoicesWidget from '../parts/choicesWidget';
import RoundsWidget from '../parts/roundsWidget';

function EventStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards } = station;
  const { t } = useTranslation();

  let data = null;
  let rounds = null;
  let money = null;
  let cards = null;
  let exhibits = null;

  const { Choices, Rounds } = Data;

  const choices = (
    <div>
      <ChoicesWidget id={Id as string} choices={Choices} />
    </div>
  );


  if (Data) {
    if (Rounds) {
      rounds = <RoundsWidget rounds={Rounds} />;
    }
  }

  if (Rewards) {
    const { Money, Cards, Exhibits } = Rewards;

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
      <p>{t(Id as string, { ns: 'events' })}</p>
      {data}
    </>
  );
}

export default EventStation;