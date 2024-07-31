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

  useEffect(() => {
    setIsLoading(true);
    getList(version).then((list) => {
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