import { TRunList } from 'utils/types/others';
import { Link } from 'react-router-dom';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import { TRequests } from 'utils/types/runData';
import { getLogLink } from 'utils/functions/helpers';
import { TComponents, TObjNumber } from 'utils/types/common';
import { useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';

function RunListItems({ ids, filteredList }: { ids: TObjNumber, filteredList: TRunList }) {
  const { version } = useContext(CommonContext);
  
  const items: TComponents = [];
  for (let i = filteredList.length - 1; i >= 0; i--) {
    const {
      id,
      name,
      character: Character,
      type: PlayerType,
      result: Type,
      timestamp: Timestamp,
      difficulty: Difficulty,
      shining: exhibit,
      requests: Requests
    } = filteredList[i];
    const resultData = { Character, PlayerType, Type, Timestamp, Difficulty, exhibit, Requests };

    const item = (
      <Link className="p-run-list__item u-button" key={id} to={getLogLink(version, id)}>
        <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
        <div className="p-run-list__cell p-run-list__cell--result-requests u-flex-col-sp">
          <div className=" p-run-list__cell--result">
            <ResultWidget resultData={resultData} name={name} />
          </div>
          <div className="p-run-list__cell--requests">
            <RequestsWidget requests={Requests as TRequests} />
          </div>
        </div>
      </Link>
    );

    items.push(item);
  }

  return (
    <>
      {items}
    </>
  );
}

export default RunListItems;