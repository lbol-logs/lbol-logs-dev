import ExhibitImage from 'components/common/parts/exhibitImage';
import { useTranslation } from 'react-i18next';
import { getEntityNs } from 'utils/functions/helpers';
import { TExhibitObj } from 'utils/types/runData';

function ExhibitWidget({ exhibit }: { exhibit: TExhibitObj}) {
  const { t } = useTranslation();

  const { Id, Counter } = exhibit;
  const [ns] = getEntityNs({ exhibit });

  let counter = null;
  if (Counter !== undefined) counter = <span className="c-exhibit-with-counter__counter u-text-shadow">{Counter}</span>;

  return (
    <span className="c-exhibit-with-counter">
      {counter}
      <ExhibitImage className="c-exhibit-with-counter__img" exhibit={Id} alt={t(`${Id}.Name`, { ns })} />
    </span>
  );
}

export default ExhibitWidget;