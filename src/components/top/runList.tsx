import { CommonContext } from 'contexts/commonContext';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useRunList from 'hooks/useRunList';
import { TRunList } from 'utils/types/others';
import { TObjNumber } from 'utils/types/common';
import Filter from './filters/filter';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import { TRequests } from 'utils/types/runData';

function RunList() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();

  const list: TRunList = useRunList(version);

  /*
   * TODO: filter & sort
   * TODO: trans, icons, requests split
   * TODO: css width adjustment
   */

  const ids = useMemo(() => {
    const o: TObjNumber = {};
    const keys = Object.keys(list);
    for (let i = 0; i < keys.length; i++) {
      o[keys[i]] = i + 1;
    }
    return o;
  }, [list]);

  return (
    <section className="p-run-list">
      <Filter />
      <div className="p-run-list__table">
        {/* {t('test', { ns: 'test/a' })} */}
        <div className="p-run-list__row p-run-list__row--header">
          <div className="p-run-list__cell p-run-list__cell--id">Id</div>
          <div className="p-run-list__cell p-run-list__cell--result-requests">
            <div className="p-run-list__cell--result">{t('result', { ns: 'runList' })}</div>
            <div className="p-run-list__cell--requests">{t('requests', { ns: 'runList' })}</div>
          </div>
        </div>
        {!Object.keys(list).length && t('notAvailableYet', { ns: 'runList' })}
        {Object.entries(list).reverse().map(([id, o]) => {
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
            <Link className="p-run-list__row" key={id} to={`/${version}/${id}/`}>
              <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
              <div className="p-run-list__cell p-run-list__cell--result-requests">
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