// import useRunList, { TRunList } from "components/hooks/useRunList";
import { getList } from "components/utils/getData";
import { VersionContext } from "contexts/versionContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function RunList() {
  const { version } = useContext(VersionContext);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState({});

  // useRunList({ setIsLoading, setList });

  useEffect(() => {
    setIsLoading(true);
    // fetch('https://ed-ev.github.io/lbol-logs-data/1.5.1/list.json').then(res => res.json()).then((list: TRunList) => {
    getList(version).then((list) => {
    // getList().then((list: TRunList) => {
      console.log(list);
      setList(list);
    });
    /*
    setTimeout(() => {
      setList({'a':1,'b':2});
    }, 5000);
    */
    setIsLoading(false);
  }, [setIsLoading, setList]);

  return (
    <>
      <p>{t('version', { ns: 'common' })}: {version}</p>
      <section className="p-run-list">
        {isLoading
          ? 'loading'
          : Object.keys(list)[0]
        }
      </section>
      {/*
        * TODO: table, filter & sort
        *
        * Character
        * Type
        * Shining
        * Difficulty
        * Requests
        * Result
        * Timestamp
        */}
    </>
  );
}

export default RunList;