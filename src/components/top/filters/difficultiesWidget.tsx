import { useTranslation } from 'react-i18next';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getDifficultyImage } from 'utils/functions/getImage';
import { ChangeEventHandler } from 'react';

function DifficultiesWidget({ onChange, difficulties }: { onChange: ChangeEventHandler, difficulties: Array<string> }) {
  const { t } = useTranslation();

  return (
    <>
      {difficulties.map((difficulty: string) => {
        return (
          <label className="p-filter__toggle u-button" key={difficulty}>
            <LazyLoadImage2 callback={getDifficultyImage} name={difficulty} alt={t(`difficulties.${difficulty}`, { ns: 'common' })} />
            <input className="p-filter__checkbox" type="checkbox" onChange={onChange} name="difficulty" value={difficulty} />
          </label>
        );
      })}
    </>
  );
}

export default DifficultiesWidget;