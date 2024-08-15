import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ onClick, requests }: { onClick: MouseEventHandler, requests: TRequests }) {
  const { t } = useTranslation();

  return null;
/*
  return (
    <label className="p-filter__toggle u-button">
      <LazyLoadImage2 callback={getExhibitImage} name={exhibit} alt={t(exhibit, { ns: 'exhibits' })} />
      <input className="p-filter__checkbox" type="checkbox" onClick={onClick} name="exhibit" value={exhibit} />
    </label>
  )

  return (
    <div className="c-requests">
      {r.map((request) => {
        const active = requests.includes(request);

        return (
          <span className="c-request" key={request}>
              <span className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`} data-name={t(`requests.${request}`, { ns: 'common' })}></span>
          </span>
        )
      })}
    </div>
  );
  */
}

export default RequestsWidget;