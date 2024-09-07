import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TExhibit, TExhibitChange, TExhibitObj } from 'utils/types/runData';
import ExhibitImage from 'components/common/parts/exhibitImage';
import { getExhibitId } from 'utils/functions/helpers';
import { dummyExhibit } from 'configs/globals';

function ExhibitCard({ exhibit, isNotAdded }: { exhibit: TExhibit | TExhibitObj | TExhibitChange, isNotAdded?: boolean }) {
  const { configsData } = useContext(CommonContext);
  const { t } = useTranslation();

  const isExhibit = typeof exhibit === 'string';
  let Id = getExhibitId(exhibit);
  let config = configsData.exhibits[Id];
  if (config == undefined) {
    Id = dummyExhibit;
    config = configsData.exhibits[Id];
  }
  const { Rarity } = config;
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
      <ExhibitImage className="c-exhibit__img" exhibit={Id} alt="" />
      <span className="c-entity__text c-exhibit__text">{t(Id, { ns: 'exhibits' })}</span>
      {counter}
    </span>
  );
}

export default ExhibitCard;