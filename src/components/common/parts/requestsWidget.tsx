import { useTranslation } from 'react-i18next';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ requests }: { requests: TRequests }) {
  const { t } = useTranslation();

  return (
    <div>
      <span>{t('request', { ns: 'common', count: requests.length })}</span>
      {requests.map(Request => {
        return (
          <span key={Request}>{t(`requests.${Request}`, { ns: 'common' })}</span>
        )
      })}
    </div>
  );
}

export default RequestsWidget;