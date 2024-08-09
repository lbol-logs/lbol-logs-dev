import { TStation } from 'utils/types/runData';
import ExhibitCards from '../entityCards/exhibitCards';
import CardCards from '../entityCards/cardCards';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { iconSize } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/getImage';

function StatationType({ station }: { station: TStation }) {
  const { Type, Data, Id, Rewards } = station;
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
        <p>Choices: {Choices.join(', ')}</p>
      );
    }

    if (Rounds) {
      rounds = (
        <span>
          <LazyLoadImage src={getCommonImage('Round')} width={iconSize} height={iconSize} alt={t('Rounds', { ns: 'common' })} />
          {Rounds}
        </span>
      );
    }
  }
  if (Rewards) {
    const { Money, Cards, Exhibits } = Rewards;

    money = (
      <span>
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
      <div className="p-rewards">
        {rounds}
        {money}
        {exhibits}
      </div>
      {cards}
    </>
  );

  return (
    <>
      <p>{Type}</p>
      {Id && (
        <p>Id: {Id}</p>
      )}
      {data}
    </>
  );
}

export default StatationType;