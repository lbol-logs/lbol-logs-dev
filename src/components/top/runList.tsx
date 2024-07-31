import { VersionContext } from "contexts/versionContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

function RunList() {
  const { version } = useContext(VersionContext);
  const { t } = useTranslation();

  return (
    <>
      <p>{t('version', { ns: 'common' })}: {version}</p>
      TODO: table, filter & sort
      {/*
        * Character
        * Type
        * Shining
        * Difficulty
        * Requests
        * Result
        * Date
        */}
    </>
  );
}

export default RunList;