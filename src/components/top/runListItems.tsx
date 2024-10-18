import { Link, useSearchParams } from 'react-router-dom';
import ResultWidget from 'components/common/parts/resultWidget';
import RequestsWidget from 'components/common/parts/requestsWidget';
import { TRequests } from 'utils/types/runData';
import { getLogLink } from 'utils/functions/helpers';
import { TComponents, TObjNumber } from 'utils/types/common';
import { useContext } from 'react';
import { CommonContext } from 'contexts/commonContext';
import { RunListContext } from 'contexts/runListContext';
import Pager from 'utils/classes/Pager';

function RunListItems({ ids }: { ids: TObjNumber }) {
  const { version } = useContext(CommonContext);
  const { filteredList } = useContext(RunListContext);
  const [searchParams] = useSearchParams();

  const pager = new Pager(filteredList, searchParams);
  const { min, max } = pager;

  const items: TComponents = [];
  for (let i = max; i >= min; i--) {
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
      <Link className="p-run-list__item u-button" key={id} to={getLogLink(version, id)} state={{ isFromList: true }}>
        <div className="p-run-list__cell p-run-list__cell--id">{ids[id]}</div>
        <div className="p-run-list__cell p-run-list__cell--result-requests">
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

  for (let i = 1; i < 3; i++) {
    const dummy = (
      <div className="p-run-list__item p-run-list__item--dummy" key={`dummy-${i}`}></div>
    );
    items.push(dummy);
  }

  return (
    <>
      {items}
    </>
  );
}

export default RunListItems;