import { CommonContext } from 'contexts/commonContext';
import { useContext, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import useRunList from 'hooks/useRunList';
import { TFilter, TFilterRadio, TRunList } from 'utils/types/others';
import { TObjNumber } from 'utils/types/common';
import Filter from './filters/filter';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import { TRequests } from 'utils/types/runData';
import { getLength } from 'utils/functions/helpers';
import useFilterOnList from 'hooks/useFilterOnList';
import DefaultFilter from 'utils/classes/DefaultFilter';

function RunList() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const list: TRunList = useRunList(version);

  const keys = Object.keys(list);
  const currentFilter = useMemo(() => {
    const currentFilter: TFilter = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (DefaultFilter.radios.includes(key)) {
        currentFilter[key as keyof TFilterRadio] = value;
      }
      else {
        if (!(key in currentFilter)) currentFilter[key] = [];
        (currentFilter[key] as Array<string>).push(value);
      }
    }
    return currentFilter;
  }, [searchParams]);

  const filteredList = useFilterOnList(list, currentFilter);
  const found = <Trans
    i18nKey="results.found"
    ns="runList"
    count={getLength(filteredList)}
  />;
  const total = <Trans
    i18nKey="results.total"
    ns="runList"
    count={getLength(list)}
  />;
  const results = <Trans
    i18nKey="results.format"
    ns="runList"
    components={{ found: found, total: total }}
  />;

  const ids = useMemo(() => {
    const o: TObjNumber = {};
    for (let i = 0; i < keys.length; i++) {
      o[keys[i]] = i + 1;
    }
    return o;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <section className="p-run-list">
      <Filter />
      <div className="p-run-list__table">
        {/* {t('test', { ns: 'test/a' })} */}
        <div className="p-run-list__row p-run-list__row--header">
          <div className="p-run-list__cell p-run-list__cell--id">Id</div>
          <div className="p-run-list__cell p-run-list__cell--result-requests u-flex-col-sp">
            <div className="p-run-list__cell--result">{t('result', { ns: 'runList' })}</div>
            <div className="p-run-list__cell--requests">{t('requests', { ns: 'runList' })}</div>
          </div>
        </div>
        {results}
        {Object.entries(filteredList).reverse().map(([id, o]) => {
          const {
            character: Character,
            type: PlayerType,
            result: Type,
            timestamp: Timestamp,
            difficulty: Difficulty,
            shining: exhibit,
            requests: Requests
          } = o;
          const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };

          return (
            <Link className="p-run-list__row u-button" key={id} to={`/${version}/${id}/`}>
              <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
              <div className="p-run-list__cell p-run-list__cell--result-requests u-flex-col-sp">
                <div className=" p-run-list__cell--result">
                  <ResultWidget resultData={resultData} />
                </div>
                <div className="p-run-list__cell--requests">
                  <RequestsWidget requests={Requests as TRequests} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RunList;