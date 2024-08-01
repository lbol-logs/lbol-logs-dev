import { useTranslation } from "react-i18next";

function Done({ category, array }: { category: string, array: Array<string> }) {
  const { t } = useTranslation();
  const key = `c-done-${category}`;

  return (
    <div className={key} key={key}>
      <h3 className={`${key}__title`}>{t(`done.keys.${category}`, { ns: 'common' })}</h3>
      <ul className={`${key}__list`}>
        {array.map((item, i) => {
          return <li className={`${key}__list-item`} key={`${category}${i}`}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default Done;