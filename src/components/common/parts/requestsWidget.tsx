import { configsData } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleIsChecked } from 'utils/functions/helpers';
import { TObjAny } from 'utils/types/common';
import { TRequestObj } from 'utils/types/others';
import { TRequests } from 'utils/types/runData';

function RequestsWidget({ requests, onChange, showModal = false }: { requests: TRequests, onChange?: ChangeEventHandler, showModal?: boolean }) {
  const { t } = useTranslation();
  const { setEntityModal } = useContext(CommonContext);
  const { requestsConfigs } = configsData;
  const ids = requestsConfigs.ids as TRequests;

  function onClick(request: TRequestObj) {
    setEntityModal({ request });
  }

  return (
    <div className="c-requests">
      {ids.map((request) => {
        const active = requests.includes(request);

        let dot;
        const span = <span className={`c-request__dot ${active ? 'c-request__dot--active' : ''}`} data-name={t(`${request}.Name`, { ns: 'requests' })}></span>;
        const props: TObjAny = {
          className: 'c-request'
        };

        if (showModal) {
          props.className += ' c-request--modal';
          props.onClick = () => onClick({ Id: request });
        }

        if (onChange) {
          props.className += ` p-filter__toggle ${toggleIsChecked(active)} u-button`;
          dot = (
            <label {...props} key={request}>
                {span}
                <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="rq" value={request} checked={active} />
            </label>
          );
        }
        else {
          dot = (
            <span {...props} key={request}>
                {span}
            </span>
          );
        }

        return dot;
      })}
    </div>
  );
}

export default RequestsWidget;