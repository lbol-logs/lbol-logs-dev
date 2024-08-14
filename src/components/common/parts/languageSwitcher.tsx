import { languages } from 'configs/globals';
import i18next from 'i18next';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  useTranslation();

  function handleLanguage(e: ChangeEvent<HTMLSelectElement>) {
    const lng = e.target.value;
    i18next.changeLanguage(lng);
  }

  const currentLanguage = i18next.language;

  return (
    <div className="l-header__language">
      <select className="c-language__select" onChange={handleLanguage} value={currentLanguage}>
        {Object.entries(languages).map(([code, { label }]) => {
          return (
            <option className="c-language__option" key={code} value={code}>{label}</option>
          );
        })}
      </select>
    </div>
  );
};

export default LanguageSwitcher;