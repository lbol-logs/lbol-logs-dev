import { CommonContext } from 'contexts/commonContext';
import { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useRunList from 'hooks/useRunList';
import { TFilter, TFilterRadio, TFilterText } from 'utils/types/others';
import { TObjNumber } from 'utils/types/common';
import Filter from './filters/filter';
import useFilterOnList from 'hooks/useFilterOnList';
import DefaultFilter from 'utils/classes/DefaultFilter';
import RunListItems from './runListItems';
import { RunListContext } from 'contexts/runListContext';
import RunListLine from './runListLine';
import Announcement from './announcement';

function RunListInner() {
  const { version, topScrollHeights, setTopScrollHeights } = useContext(CommonContext);
  const { list, setList, setFilteredList } = useContext(RunListContext);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useRunList(version, setList);

  const currentFilter = useMemo(() => {
    const currentFilter: TFilter = {};
    const keys = DefaultFilter.keys;
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!(key in keys)) continue;
      if (DefaultFilter.texts.includes(key)) {
        currentFilter[key as keyof TFilterText] = value;
      }
      else if (DefaultFilter.radios.includes(key)) {
        currentFilter[key as keyof TFilterRadio] = value;
      }
      else {
        if (!(key in currentFilter)) currentFilter[key] = [];
        (currentFilter[key] as Array<string>).push(value);
      }
    }
    return currentFilter;
  }, [searchParams]);

  useFilterOnList(list, currentFilter, setFilteredList);

  const ids = useMemo(() => {
    return list.reduce((a: TObjNumber, b, i) => {
      const id = b.id as string;
      a[id] = i + 1;
      return a;
    }, {});
  }, [list]);

  function onClick() {
    const height = window.scrollY;
    setTopScrollHeights(Object.assign(topScrollHeights, { [version]: height }));
  }

  useEffect(() => {
    const height = topScrollHeights[version];
    if (height !== undefined) setTimeout(() => window.scrollTo(0, height), 100);
  }, []);

  return (
    <section className="p-run-list">
      <Announcement />
      <Filter />
      <div className="p-run-list__output js-runList">
        <RunListLine onlyPager={false} />
        <div className="p-run-list__table">
          <div className="p-run-list__header">
            {['', 'p-run-list__item--tb', 'p-run-list__item--pc'].map((className, i) => {
              return (
                <div className={`p-run-list__item--header ${className}`} key={i}>
                  <div className="p-run-list__cell p-run-list__cell--id">Id</div>
                  <div className="p-run-list__cell p-run-list__cell--result-requests">
                    <div className="p-run-list__cell--result">
                      <span>{t('result', { ns: 'runList' })}</span>
                      <span>{t('name', { ns: 'runList' })}</span>
                    </div>
                    <div className="p-run-list__cell--requests">
                      <span>{t('requests', { ns: 'runList' })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-run-list__body">
            <RunListItems ids={ids} onClick={onClick} />
          </div>
        </div>
        <RunListLine onlyPager={true} />
      </div>
    </section>
  );
}

export default RunListInner;