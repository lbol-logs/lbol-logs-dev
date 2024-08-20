import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import RoundsWidget from '../parts/roundsWidget';
import CurrentChange from '../currentChange';

function TempStation({ station }: { station: TStation }) {
  const { Data, Id, Rewards, Node: { Level } } = station;
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
      <span className="p-entity__money">
        <LazyLoadImage2 callback={getCommonImage} name={'Money'} alt={t('money', { ns: 'log' })} />
        {Money}
      </span>
    );

    cards = (
      <>
        {Cards.map((cards, i) => {
          return (
            <div className="p-entity p-entity--cards" key={i}>
              <div className="p-entity__label">
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
        <div className="p-entity p-entity--exhibits">
          <div className="p-entity__label">
            <LazyLoadImage2 callback={getCommonImage} name={'Exhibit'} alt={t('exhibit', { ns: 'common' })} />
          </div>
          <ExhibitCards exhibits={Exhibits} />
        </div>
      );
    }
  }

  data = (
    <div className="p-station__body">
      <div className="p-station__main">
        {choices}
        <div className="p-entity">
          {rounds}
          {money}
        </div>
        {cards}
        {exhibits}
      </div>
      <div className="p-entities">
        <CurrentChange level={Level} />
      </div>
    </div>
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