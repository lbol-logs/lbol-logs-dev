import { useTranslation } from 'react-i18next';

function Filter() {
  const { t } = useTranslation();

  return null;

  return (
    <div className="p-filter">
        <div className="p-filter__row">
          <div className="p-filter__label">{t('character', { ns: 'runList' })}</div>
          <div className="p-filter__values">
          </div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('exhibit', { ns: 'common' })}</div>
          <div className="p-filter__values"></div>
            {/* TODO: 初期展示品、展示品交換(展示品)、展示品交換(色) */}
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('advancedOption', { ns: 'common' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('advancedOption', { ns: 'common' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('advancedOption', { ns: 'common' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('difficulty', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('requests', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('result', { ns: 'runList' })}</div>
          <div className="p-filter__values"></div>
        </div>
        <div className="p-filter__row">
          <div className="p-filter__label">{t('sort', { ns: 'runList' })}</div>
          <div className="p-filter__values">
            {/* Newest / Oldest */}
          </div>
        </div>
    </div>
  );
}

export default Filter;