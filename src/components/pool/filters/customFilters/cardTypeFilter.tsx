import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getCardTypeImage } from 'utils/functions/getImage';
import { toggleIsChecked } from 'utils/functions/helpers';

function CardTypeFilter({ onChange }: { onChange: ChangeEventHandler }) {
  const { filter } = useContext(CardPoolContext);
  const { ct } = filter;
  const { t } = useTranslation();

  const cardTypes = ['Attack', 'Defense', 'Skill', 'Ability', 'Friend'];

  return (
    <>
      <div className="p-filter__row">
        <div className="p-filter__label">{t('cardType', { ns: 'site' })}</div>
        <div className="p-filter__values">
          {cardTypes.map(cardType => {
            const isChecked = ct ? ct.includes(cardType) : false;

            return (
              <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={cardType}>
                <LazyLoadImage2 callback={getCardTypeImage} name={cardType} alt={t(`cardTypes.${cardType}`, { ns: 'log' })} />
                <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="ct" value={cardType} checked={isChecked} />
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CardTypeFilter;