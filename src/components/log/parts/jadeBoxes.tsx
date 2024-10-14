import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { TJadeBoxObj } from 'utils/types/others';

function JadeBoxes() {
  const { runData, setEntityModal } = useContext(LogContext);
  const { t } = useTranslation();

  const { JadeBoxes } = runData.Settings;

  if (JadeBoxes === undefined) return null;

  function onClick(jadeBox: TJadeBoxObj) {
    setEntityModal({ jadeBox });
  }

  return (
    <div className="p-summary__jade-boxes">
      <div className="p-summary__line">
        <LazyLoadImage2 callback={getCommonImage} name="JadeBox" alt="" />
        {t('JadeBox', { ns: 'log' })}
      </div>
      <ul className="p-jade-boxes">
        {JadeBoxes.map(jadeBox => {
          const _onClick = () => onClick({ Id: jadeBox });

          return (
            <li className="p-jade-box" key={jadeBox} onClick={_onClick}>
              {t(`${jadeBox}.Name`, { ns: 'jadeBoxes' })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default JadeBoxes;