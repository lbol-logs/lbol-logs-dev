import UseList from 'hooks/useList';
import { TRunList } from 'utils/types';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function RunList({ list }: { list: TRunList }) {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();
  
  const headers = ['character', 'type', 'shining', 'difficulty', 'requests', 'result', 'timestamp'];

  /*
   * TODO: filter & sort
   * trans, icons, requests split
   * css width adjustment
   */

  return (
    <div className="p-run-list__table">
      <div className="p-run-list__row p-run-list__row--header">
        {headers.map(header => {
          return (
            <div className={`p-run-list__cell p-run-list__cell--${header}`} key={header}>{t(header, { ns: 'run' })}</div>
          );
        })}
      </div>
      {Object.entries(list).map(([id, o]) => {
        return (
          <Link className="p-run-list__row" key={id} to={`/${version}/${id}/`}>
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