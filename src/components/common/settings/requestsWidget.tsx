import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ requests }: { requests: TRequests }) {
  const { t } = useTranslation();
  const { configsData } = useContext(LogContext);
  // TODO
  const { requestData } = configsData;

  return (
    <div className="c-requests">
      {requestData.map((request, i) => {
        const active = requests.includes(request);

        return (
          <span className="c-request" key={request}>
              <span className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`} data-name={t(`requests.${request}`, { ns: 'common' })}></span>
          </span>
        )
      })}
    </div>
  );
}

export default RequestsWidget;