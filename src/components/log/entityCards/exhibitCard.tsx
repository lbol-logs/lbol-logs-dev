import Processing from 'components/common/layouts/processing';
import { iconSize } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getExhibitImage } from 'utils/functions/getImage';
import { TExhibit, TExhibitChange, TExhibitObj } from 'utils/types/runData';

function ExhibitCard({ exhibit }: { exhibit: TExhibit | TExhibitObj | TExhibitChange }) {
  const { configsData } = useContext(CommonContext);
  const { runData, holdings } = useContext(LogContext);
  const { t } = useTranslation();

  const isExhibit = typeof exhibit === 'string';
  const Id = isExhibit ? exhibit : exhibit.Id;
  const { Rarity } = configsData.exhibits[Id];
  let counter = null;

  if (!isExhibit) {
    const _exhibit: TExhibitChange = exhibit as TExhibitChange;
    const isExhibitChange = _exhibit.Type;
    if (isExhibitChange) {
      let lastCounter = <Processing />;
      const { Act, Level } = runData.Stations[_exhibit.Station].Node;
      const i = holdings.findIndex(({ Act: _act, Level: _level }) => Act === _act && Level === _level);
      if (i) {
        const exhibit: TExhibitObj = holdings[i - 1].Exhibits.find(({ Id: _id }) => _id === Id) as TExhibitObj;
        const { Counter } = exhibit;
        lastCounter = (
          <>
            {Counter}-{'>'}
          </>
        );
      }

      counter = (
        <span className="c-exhibit__counter">
          {lastCounter}{exhibit.Counter}
        </span>
      );
    }
    else {
      const { Counter } = exhibit;
      if (Counter) {
        counter = (
          <span className="c-exhibit__counter">
            {'('}{Counter}{')'}
          </span>
        );
      }
    }
  }

  return (
    <span className={`c-entity c-entity--${Rarity} c-exhibit`}>
      <LazyLoadImage2 className="c-exhibit__img" callback={getExhibitImage} name={Id} width={iconSize} height={iconSize}   alt="" />
      <span className="c-entity__text c-exhibit__text">{t(Id, { ns: 'exhibits' })}</span>
      {counter}
    </span>
  );
}

export default ExhibitCard;