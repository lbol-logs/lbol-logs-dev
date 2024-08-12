import { TStation } from 'utils/types/runData';
import ExhibitCards from '../../entityCards/exhibitCards';
import CardCards from '../../entityCards/cardCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import ChoicesWidget from './choicesWidget';

function EventStation({ station }: { station: TStation }) {
  const { Type, Data, Id, Rewards } = station;
  const { t } = useTranslation();

  let data = null;
  let rounds = null;
  let money = null;
  let cards = null;
  let exhibits = null;

  const { Choices, Rounds } = Data;

  const choices = (
    <p>
      {t('choices', { ns: 'stations' })}
      <ChoicesWidget id={Id as string} choices={Choices} />
    </p>
  );


  if (Data) {
    if (Rounds) {
      rounds = (
        <span className="c-rewards__rounds">
          <LazyLoadImage src={getCommonImage('Round')} width={iconSize} height={iconSize} alt={t('Rounds', { ns: 'common' })} />
          {Rounds}
        </span>
      );
    }
  }

  if (Rewards) {
    const { Money, Cards, Exhibits } = Rewards;

    money = (
      <span className="c-rewards__money">
        <LazyLoadImage src={getCommonImage('Money')} width={iconSize} height={iconSize} alt={t('Money', { ns: 'common' })} />
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
      <p>{t(Type, { ns: 'stations' })}</p>
      <p>{t(Id as string, { ns: 'events' })}</p>
      {data}
    </>
  );
}

export default EventStation;