import RequestsWidget from 'components/common/parts/requestsWidget';
import { RunListContext } from 'contexts/runListContext';
import { ChangeEventHandler, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultFilter from 'utils/classes/DefaultFilter';
import { TFilterRadio } from 'utils/types/others';

function RequestsTypes({ onRequestsTypesChange, onRequestsChange, showRequets }: { onRequestsTypesChange: ChangeEventHandler, onRequestsChange: ChangeEventHandler, showRequets: boolean }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { rt } = filter as TFilterRadio;
  const { rq } = filter;

  const keys = DefaultFilter.keys;
  const defaultType = DefaultFilter.check(keys.rt);
  const values = ['both', 'inactive', 'active'];
  let requestsInput = null;
  if (showRequets) {
    requestsInput = (
      <RequestsWidget requests={rq || DefaultFilter.get(keys.rq)} onChange={onRequestsChange} />
    )
  }

  return  (
    <>
      <div className="p-filter__requests-types">
        {values.map(value => {
          const isChecked = (rt || defaultType) === value;

          return (
            <label key={value}>
              <input type="radio" name="rt" value={value} onChange={onRequestsTypesChange} checked={isChecked} />
              {t(value, { ns: 'runList' })}
            </label>
          );
        })}
      </div>
      {requestsInput}
    </>
  );
}

export default RequestsTypes;