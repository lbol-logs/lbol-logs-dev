import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';

function Packs() {
  const { runData } = useContext(LogContext);
  const { t } = useTranslation();

  const { Packs } = runData.Settings;

  if (Packs === undefined || Packs.length === 0) return null;

  return (
    <div className="p-summary__packs">
      <div className="p-summary__line">
        <LazyLoadImage2 callback={getCommonImage} name="pack" height="24" alt="" />
        {t('Pack', { ns: 'log' })}
      </div>
      <ul className="p-packs">
        {Packs.map(pack => {
          return (
            <li className="p-pack" key={pack}>
              {t(`packs.${pack}`, { ns: 'log' })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Packs;