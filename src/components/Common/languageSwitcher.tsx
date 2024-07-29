import globals from 'configs/globals';
import i18next from 'i18next';
import { useState } from 'react';

function LanguageSwitcher() {
  const [language, setLanguage] = useState(i18next.language);

  type languageProps = {
    code: string
  };

  function handleLanguage(code: string) {
    i18next.changeLanguage(code);
    setLanguage(code);
  }
  
  function Lang(props: languageProps) {
    const { code } = props;
    const isCurrentLanguage = language === code;
    const lang = (
      <>
        {globals[code]}
      </>
    );
    if (isCurrentLanguage) {
      return (
        <strong>{lang}</strong>
      );
    }
    return (
      <button onClick={() => handleLanguage(code)}>{lang}</button>
    );
  }

  return (
    <>
      <Lang code={'en'} />
      /
      <Lang code={'ja'} />
    </>
  );
};

export default LanguageSwitcher;