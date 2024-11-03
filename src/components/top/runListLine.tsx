import { Trans, useTranslation } from 'react-i18next';
import RunListResults from './runListResults';
import RunListPager from './runListPager';
import { logUpdate } from 'configs/globals';
import { TComponents } from 'utils/types/common';

function RunListLine({ onlyPager }: { onlyPager: boolean }) {
  useTranslation();

  const items: TComponents = [];
  items.push(<RunListPager key="pager" />);
  if (!onlyPager) {
    items.unshift(<RunListResults key="results" />);
    const remark = (
      <p className="p-run-list__remark" key="remark">
        <Trans
          i18nKey="remark"
          ns="runList"
          values={{ min: logUpdate }}
        />
      </p>
    );
    items.push(remark);
  }

  return (
    <div className={`p-run-list__line`}>
      {items}
    </div>
  )
}

export default RunListLine;