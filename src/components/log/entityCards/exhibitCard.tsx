import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getExhibitImage } from 'utils/functions/getImage';
import { TExhibit, TExhibitChange, TExhibitObj } from 'utils/types/runData';

function ExhibitCard({ exhibit, isNotAdded }: { exhibit: TExhibit | TExhibitObj | TExhibitChange, isNotAdded?: boolean }) {
  const { configsData } = useContext(CommonContext);
  const { t } = useTranslation();

  const isExhibit = typeof exhibit === 'string';
  const Id = isExhibit ? exhibit : exhibit.Id;
  const { Rarity } = configsData.exhibits[Id];
  let counter = null;

  if (!isExhibit) {
    const { Counter } = exhibit;
    if (Counter) {
      counter = (
        <span className="c-exhibit__counter">
          {'('}{Counter}{')'}
        </span>
      );
    }
  }

  return (
    <span className={`c-entity c-entity--${Rarity} ${isNotAdded === true ? 'c-entity--not-added' : ''} c-exhibit`}>
      <LazyLoadImage2 className="c-exhibit__img" callback={getExhibitImage} name={Id} alt="" />
      <span className="c-entity__text c-exhibit__text">{t(Id, { ns: 'exhibits' })}</span>
      {counter}
    </span>
  );
}

export default ExhibitCard;