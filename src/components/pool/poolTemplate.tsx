import BaseManasWidget from 'components/common/parts/baseManasWidget';
import Filter from './filters/filter';
import usePoolOnEntities from 'hooks/usePoolOnEntities';
import { useContext, useMemo } from 'react';
import { CardPoolContext } from 'contexts/cardPoolContext';
import { useSearchParams } from 'react-router-dom';
import { TPool, TPoolCheckbox, TPoolRadio } from 'utils/types/others';
import DefaultPool from 'utils/classes/DefaultPool';
import CardCards from 'components/log/entityCards/cardCards';
import Modal from 'components/log/modal';
import { useTranslation } from 'react-i18next';

function PoolTemplate() {
  const { validCards, setValidCards, addedValidCards, setAddedValidCards, removedValidCards, setRemovedValidCards, showDiff } = useContext(CardPoolContext);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const currentFilter = useMemo(() => {
    const currentFilter: TPool = {};
    const keys = DefaultPool.keys;
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!(key in keys)) continue;
      if (DefaultPool.radios.includes(key)) {
        currentFilter[key as keyof TPoolRadio] = value;
      }
      else {
        const _key = key as keyof TPoolCheckbox;
        if (!(key in currentFilter)) currentFilter[_key] = [];
        (currentFilter[_key] as Array<string>).push(value);
      }
    }
    return currentFilter;
  }, [searchParams]);

  const o = usePoolOnEntities({ currentFilter, validCards, setValidCards, setAddedValidCards, setRemovedValidCards });
  const {
    baseMana = '',
    baseManaWithoutEvent = ''
  } = o || {};

  const pools = [
    {
      type: 'added',
      cards: addedValidCards,
      prefix: '＋',
      hidden: !showDiff
    },
    {
      type: 'removed',
      cards: removedValidCards,
      prefix: '－',
      hidden: !showDiff
    },
    {
      type: 'valid',
      cards: validCards,
      prefix: '▲'
    }
  ];

  return (
    <section className="p-card-pool">
      <Modal />
      <Filter baseManaWithoutEvent={baseManaWithoutEvent} />
      <BaseManasWidget baseMana={baseMana} />
      {pools.map(({ type, cards, prefix, hidden }) => {
        if (!cards.length) return null;
        if (hidden) return null;
        return (
          <div className={`p-card-pool__cards p-card-pool__cards--${type}`} key={type}>
            <h2>
              <span className={`p-card-pool__type--${type}`}>{prefix}</span>
              {t('cardsCount', { ns: 'log', count: cards.length })}
            </h2>
            <CardCards cards={cards} />
          </div>
        );
      })}
    </section>
  );
}

export default PoolTemplate;