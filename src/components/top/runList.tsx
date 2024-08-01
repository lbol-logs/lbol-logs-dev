import UseList from 'hooks/useList';
import { TRunList } from 'utils/types';
import { CommonContext } from 'contexts/commonContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function RunList() {
  const { version } = useContext(CommonContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({});

  const headers = ['character', 'type', 'shining', 'difficulty', 'requests', 'result', 'timestamp'];

  return (
    <>
      <section className="p-run-list">
        <UseList setIsLoading={setIsLoading} setList={setList} version={version} />
        {isLoading
          ? t('loading', { ns: 'common' })
          : <>
          {/*
            * TODO: filter & sort
            * trans, icons, requests split
            * css width adjustment
            */}
            <div className="p-run-list__table">
              <div className="p-run-list__row p-run-list__row--header">
                {headers.map(header => {
                  return (
                    <div className={`p-run-list__cell p-run-list__cell--${header}`} key={header}>{t(header, { ns: 'run' })}</div>
                  );
                })}
              </div>
              {Object.entries(list as TRunList).map(([id, o]) => {
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
          </>
        }
      </section>
    </>
  );
}

export default RunList;