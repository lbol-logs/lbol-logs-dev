import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TExhibit, TExhibitChange, TExhibitObj } from 'utils/types/runData';
import ExhibitImage from 'components/common/parts/exhibitImage';
import { LogContext } from 'contexts/logContext';

function ExhibitCard({ exhibit, isNotAdded }: { exhibit: TExhibit | TExhibitObj | TExhibitChange, isNotAdded?: boolean }) {
  const { configsData } = useContext(CommonContext);
  const { setEntityModal } = useContext(LogContext);
  const { t } = useTranslation();

  const isExhibit = typeof exhibit === 'string';
  const _exhibit = isExhibit ? { Id: exhibit } : exhibit;

  const { Id } = _exhibit;
  const { Rarity } = configsData.exhibits[Id];
  let counter = null;

  if (!isExhibit) {
    const { Counter } = _exhibit;
    if (Counter !== undefined) {
      counter = (
        <span className="c-exhibit__counter">
          {'('}{Counter}{')'}
        </span>
      );
    }
  }

  function onClick() {
    setEntityModal({ exhibit: _exhibit });
  }

  return (
    <span className={`c-entity c-entity--${Rarity} ${isNotAdded === true ? 'c-entity--not-added' : ''} c-exhibit`} onClick={onClick}>
      <ExhibitImage className="c-exhibit__img" exhibit={Id} alt="" />
      <span className="c-entity__text c-exhibit__text">{t(Id, { ns: 'exhibits' })}</span>
      {counter}
    </span>
  );
}

export default ExhibitCard;