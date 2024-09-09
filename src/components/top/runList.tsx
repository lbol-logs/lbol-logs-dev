import { CommonContext } from 'contexts/commonContext';
import { useContext, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import useRunList from 'hooks/useRunList';
import { TFilter, TFilterRadio, TFilterText } from 'utils/types/others';
import { TObjNumber } from 'utils/types/common';
import Filter from './filters/filter';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import { TRequests } from 'utils/types/runData';
import { getLength, getLogLink } from 'utils/functions/helpers';
import useFilterOnList from 'hooks/useFilterOnList';
import DefaultFilter from 'utils/classes/DefaultFilter';

function RunList() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const list = useRunList(version);

  const currentFilter = useMemo(() => {
    const currentFilter: TFilter = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
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
    components={{ found, total }}
  />;

  const ids = useMemo(() => {
    return list.reduce((a: TObjNumber, b, i) => {
      const id = b.id as string;
      a[id] = i + 1;
      return a;
    }, {});
  }, [list]);

  return (
    <section className="p-run-list">
      <Filter />
      <div className="p-run-list__line">
        <p className="p-run-list__results">{results}</p>
        <p className="p-run-list__remark">{t('remark', { ns: 'runList' })}</p>
      </div>
      <div className="p-run-list__table">
        <div className="p-run-list__row p-run-list__row--header">
          <div className="p-run-list__cell p-run-list__cell--id">Id</div>
          <div className="p-run-list__cell p-run-list__cell--result-requests u-flex-col-sp">
            <div className="p-run-list__cell--result">
              <span>{t('result', { ns: 'runList' })}</span>
              <span>{t('name', { ns: 'runList' })}</span>
            </div>
            <div className="p-run-list__cell--requests">
              <span>{t('requests', { ns: 'runList' })}</span>
            </div>
          </div>
        </div>
        {filteredList.reverse().map(e => {
          const {
            id,
            name,
            character: Character,
            type: PlayerType,
            result: Type,
            timestamp: Timestamp,
            difficulty: Difficulty,
            shining: exhibit,
            requests: Requests
          } = e;
          const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };

          return (
            <Link className="p-run-list__row u-button" key={id} to={getLogLink(version, id)}>
              <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
              <div className="p-run-list__cell p-run-list__cell--result-requests u-flex-col-sp">
                <div className=" p-run-list__cell--result">
                  <ResultWidget resultData={resultData} name={name} />
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