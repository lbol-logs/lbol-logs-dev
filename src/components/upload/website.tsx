import { websiteTitleMaxLength, websiteUrlMaxLength } from 'configs/globals';
import { useTranslation } from 'react-i18next';

function Website() {
  const { t } = useTranslation();

  return (
    <div className="p-upload__website">
      <div className="p-upload-website__line">
        <div className="p-upload-website__title">
          <h3 className="p-upload-website__head">Website</h3>
          <span className="p-upload-website__optional">({t('optional', { ns: 'site' })})</span>
        </div>
      </div>
      <div className="p-upload-website__line">
        <label>
          <span className="p-upload-website__label">Title: </span>
          <input className="p-upload-website__input js-title" name="title" maxLength={websiteTitleMaxLength} />
        </label>
      </div>
      <div className="p-upload-website__line">
        <label>
          <span className="p-upload-website__label">URL: </span>
          <input className="p-upload-website__input js-url" name="url" maxLength={websiteUrlMaxLength} />
        </label>
      </div>
    </div>
  );
}

export default Website;