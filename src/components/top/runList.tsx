import { getList } from "components/utils/getData";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function RunList() {
  const { version } = useContext(VersionContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({});

  const headers = ['character', 'type', 'shining', 'difficulty', 'requests', 'result', 'timestamp'];

  type TRunList = Record<string, Record<string, string | Array<string>>>;

  useEffect(() => {
    setIsLoading(true);
    getList(version).then((list: TRunList) => {
      setList(list);
      setIsLoading(false);
    });
  }, [setIsLoading, setList, version]);

  return (
    <>
      <p>{t('version', { ns: 'common' })}: {version}</p>
      <section className="p-run-list">
        {isLoading
          ? 'loading'
          : <>
          {/*
            * TODO: filter & sort
            */}
            <div className="p-run-list__table">
              <div className="p-run-list__header-row">
                {headers.map(header => {
                  return (
                    <div className="p-run-list__header-cell">{t(header, { ns: 'run' })}</div>
                  );
                })}
              </div>
              {Object.entries(list as TRunList).map(([id, o]) => {
                return (
                  <Link className="p-run-list__row" key={id} to={`/${version}/${id}/`}>
                    {Object.entries(o).map(([key, value]) => {
                      return (
                        <div className="p-run-list__cell" key={`${id}_${key}`}>{Array.isArray(value) ? value.join(', ') : value}</div>
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