import { useTranslation } from "react-i18next";

function KeywordsWidget({ keywords}: { keywords: Array<string> }) {
  const { t } = useTranslation();

  return (
    <div className="p-card__description p-card__keywords" key="keywords">
      {keywords.map(keyword => {
        return (
          <span className="c-card__keyword">{t(keyword, { ns: 'keywords' })}</span>
        );
      })}
    </div>
  );
}

export default KeywordsWidget;