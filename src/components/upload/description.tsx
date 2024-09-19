import { descriptionMaxLength } from 'configs/globals';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

function Description() {
  const { t } = useTranslation();
  const [length, setLength] = useState(0);

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setLength(e.target.value.length);
  }

  return (
    <div className="p-upload__description">
      <div className="p-upload-description__line">
        <div className="p-upload-description__title">
          <h3 className="p-upload-description__head">{t('description', { ns: 'log' })}</h3>
          <span>({t('optional', { ns: 'site' })})</span>
        </div>
        <span className="p-upload-description__count">
          {length}
          /
          {descriptionMaxLength}
        </span>
      </div>
      <textarea
        className="p-upload-description__textarea js-textarea"
        maxLength={descriptionMaxLength}
        rows={10}
        cols={100}
        onChange={onChange}
      ></textarea>
    </div>
  )
}

export default Description;