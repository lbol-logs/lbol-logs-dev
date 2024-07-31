import { getList } from "components/utils/getData";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function RunList() {
  const { version } = useContext(VersionContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({});

  const headers = ['Character', 'Type', 'Shining', 'Difficulty', 'Requests', 'Result', 'Timestamp'];

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
            <table className="p-run-list__table">
              <thead className="p-run-list__header-row">
                {headers.map(header => <th className="p-run-list__header-cell">{header}</th>)}
              </thead>
              <tbody>
                {Object.entries(list as TRunList).map(([id, o]) => {
                  return (
                    <tr className="p-run-list__row" key={id}>
                      {Object.entries(o).map(([key, value]) => {
                        return (
                          <td className="p-run-list__cell" key={`${id}_${key}`}>{Array.isArray(value) ? value.join(', ') : value}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        }
      </section>
    </>
  );
}

export default RunList;