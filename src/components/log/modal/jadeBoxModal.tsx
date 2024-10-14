import { useTranslation } from 'react-i18next';
import DescriptionWidget from './descriptionWidget';
import { TJadeBoxObj } from 'utils/types/others';

function JadeBoxModal({ jadeBox }: { jadeBox: TJadeBoxObj }) {
  const { t } = useTranslation();

  const { Id } = jadeBox;
  const ns = 'jadeBoxes';

  return (
    <div className="p-modal__jade-box">
      <div className="p-modal__line">
        <span className="p-modal__name">{t(`${Id}.Name`, { ns })}</span>
      </div>
      <div className="p-modal__body">
        <DescriptionWidget entityObj={{ jadeBox }} />
      </div>
    </div>
  );
}

export default JadeBoxModal;