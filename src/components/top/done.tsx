import { useTranslation } from 'react-i18next';
import { TAboutComponent } from 'utils/types/others';

function Done({ className, category, array }: TAboutComponent) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <h3 className={`${className}__title`}>{t(`done.keys.${category}`, { ns: 'common' })}</h3>
      <ul className={`${className}__list`}>
        {array.map((item, i) => {
          return <li className={`${className}__list-item`} key={`${category}${i}`}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default Done;