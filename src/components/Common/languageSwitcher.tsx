import { languages } from 'configs/globals';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  useTranslation();

  type languageProps = {
    code: string
    text: string
  };

  function handleLanguage(code: string) {
    i18next.changeLanguage(code);
  }
  
  function Lang(props: languageProps) {
    const { code, text } = props;
    const isCurrentLanguage = i18next.language === code;
    const lang = (
      text
    );

    return (
      <>
        {isCurrentLanguage
          ? <strong>{lang}</strong>
          : <button onClick={() => handleLanguage(code)}>{lang}</button>
        }
      </>
    );
  }

  return (
    <>
      {Object.entries(languages).map(([code, text]) => {
        return <Lang key={code} code={code} text={text} />
      })}
    </>
  );
};

export default LanguageSwitcher;