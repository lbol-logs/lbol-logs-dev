import { CommonContext } from 'contexts/commonContext';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useList from 'hooks/useList';
import { TRunList } from 'utils/types/others';
import { TObjNumber } from 'utils/types/common';

function RunList() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();

  const list: TRunList = useList(version);

  const headers = ['character', 'type', 'shining', 'difficulty', 'requests', 'result', 'timestamp'];

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
    <div className="p-run-list__table">
      {/* {t('test', { ns: 'test/a' })} */}
      <div className="p-run-list__row p-run-list__row--header">
      <div className="p-run-list__cell p-run-list__cell--id">Id</div>
        {headers.map(header => {
          return <div className={`p-run-list__cell p-run-list__cell--${header}`} key={header}>{t(header, { ns: 'run' })}</div>;
        })}
      </div>
      {!Object.keys(list).length && t('notAvailableYet', { ns: 'common' })}
      {Object.entries(list).reverse().map(([id, o]) => {
        return (
          <Link className="p-run-list__row" key={id} to={`/${version}/${id}/`}>
            <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
            {Object.entries(o).map(([key, value]) => {
              return (
                <div className={`p-run-list__cell p-run-list__cell--${key}`} key={`${id}_${key}`}>{Array.isArray(value) ? value.join(', ') : value}</div>
              );
            })}
          </Link>
        );
      })}
    </div>
  );
}

export default RunList;