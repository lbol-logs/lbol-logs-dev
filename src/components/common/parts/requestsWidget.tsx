import { requestsList } from 'configs/globals';
import { useTranslation } from 'react-i18next';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ requests }: { requests: TRequests }) {
  const { t } = useTranslation();

  return (
    <div className="c-requests">
      {requestsList.map((request, i) => {
        const active = requests.includes(request);

        return (
          <div className="c-request" key={request}>
            <span className="c-request__circle">
              <i className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`}></i>
            </span>
            <span className="c-request-name">
              <span className="c-request-name__inner">
                {t(`requests.${request}`, { ns: 'common' })}
                <i className="c-request-name__arrow"></i>
              </span>
            </span>
          </div>
        )
      })}
    </div>
  );
}

export default RequestsWidget;