import { CommonContext } from 'contexts/commonContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleIsChecked } from 'utils/functions/helpers';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ requests, onChange }: { requests: TRequests, onChange?: ChangeEventHandler }) {
  const { t } = useTranslation();
  const { configsData } = useContext(CommonContext);
  const requestConfigs: TRequests = Object.keys(configsData.requests) as TRequests;

  return (
    <div className="c-requests">
      {requestConfigs.map((request) => {
        const active = requests.includes(request);

        let dot;
        if (onChange) {
          dot = (
            <label className={`c-request p-filter__toggle ${toggleIsChecked(active)} u-button`} key={request}>
                <span className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`} data-name={t(`requests.${request}`, { ns: 'common' })}></span>
                <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="rq" value={request} checked={active} />
            </label>
          );
        }
        else {
          dot = (
            <span className="c-request" key={request}>
                <span className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`} data-name={t(`requests.${request}`, { ns: 'common' })}></span>
            </span>
          );
        }

        return dot;
      })}
    </div>
  );
}

export default RequestsWidget;