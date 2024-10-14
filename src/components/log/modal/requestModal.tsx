import { useTranslation } from 'react-i18next';
import DescriptionWidget from './descriptionWidget';
import { TRequestObj } from 'utils/types/others';

function RequestModal({ request }: { request: TRequestObj }) {
  const { t } = useTranslation();

  const { Id } = request;
  const ns = 'requests';

  return (
    <div className="p-modal__jade-box">
      <div className="p-modal__line">
        <span className="p-modal__name">{t(`${Id}.Name`, { ns })}</span>
      </div>
      <div className="p-modal__body">
        <DescriptionWidget entityObj={{ request }} />
      </div>
    </div>
  );
}

export default RequestModal;