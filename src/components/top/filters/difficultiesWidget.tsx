import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getDifficultyImage } from 'utils/functions/getImage';
import { ChangeEventHandler, useContext } from 'react';
import { RunListContext } from 'contexts/runListContext';
import { toggleIsChecked } from 'utils/functions/helpers';

function DifficultiesWidget({ onChange, difficulties }: { onChange: ChangeEventHandler, difficulties: Array<string> }) {
  const { t } = useTranslation();
  const { filter } = useContext(RunListContext);
  const { di } = filter;

  return (
    <>
      {difficulties.map((difficulty: string) => {
        const isChecked = di ? di.includes(difficulty) : false;

        return (
          <label className={`p-filter__toggle ${toggleIsChecked(isChecked)} u-button`} key={difficulty}>
            <LazyLoadImage2 callback={getDifficultyImage} name={difficulty} alt={t(`difficulties.${difficulty}`, { ns: 'common' })} />
            <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="di" value={difficulty} checked={isChecked} />
          </label>
        );
      })}
    </>
  );
}

export default DifficultiesWidget;