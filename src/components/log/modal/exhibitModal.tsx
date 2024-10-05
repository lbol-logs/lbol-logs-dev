import { TExhibitObj } from 'utils/types/runData';
import DescriptionWidget from './descriptionWidget';
import { useTranslation } from 'react-i18next';
import ExhibitWidget from './exhibitWidget';
import { getEntityNs } from 'utils/functions/helpers';

function ExhibitModal({ exhibit }: { exhibit: TExhibitObj }) {
  const { t } = useTranslation();

  const { Id } = exhibit;
  const [ns] = getEntityNs({ exhibit });

  return (
    <div className="p-modal__exhibit">
      <div className="p-modal__line">
        <ExhibitWidget exhibit={exhibit} />
        <span className="p-modal__name">{t(`${Id}.Name`, { ns })}</span>
      </div>
      <div className="p-modal__body">
        <DescriptionWidget entityObj={{ exhibit }} />
      </div>
    </div>
  );
}

export default ExhibitModal;