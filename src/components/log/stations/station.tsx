import { RefObject } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TStation } from 'utils/types';
import Act from './act';

function Station({ station, innerRef }: { station: TStation, innerRef?: RefObject<HTMLDivElement>}) {
  useTranslation();
  const { Level } = station.Node;

  return (
    <div className={`p-station ${innerRef ? 'p-station--last' : ''} js-level-${Level}`} ref={innerRef}>
      {!Level && <Act /> }
      <h3 className="P-station__level">
        <Trans
          i18nKey="level"
          ns="log"
          children={{
            level: Level
          }}
        />
      </h3>
      {station.Type}
    </div>
  );
}

export default Station;