import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getGapImage } from 'utils/functions/getImage';
import { TStation } from 'utils/types/runData';
import GapDescriptions from '../parts/gapDescriptions';
import { TRange3 } from 'utils/types/common';
import DialoguesWidget from '../parts/dialoguesWidget';

function GapStation({ station }: { station: TStation }) {
  const { Data } = station;
  const { Choice, Options, Choices } = Data as { Choice: string, Options: Array<string>, Choices: Array<TRange3> };
  const { t } = useTranslation();

  let littleChat = null;

  if (Choices) {
    const id = 'YukariProvide';

    littleChat = (
      <div className="p-gap-little-chat">
        <p className="p-gap-little-chat__title">
          {t(`${id}.Title`, { ns: 'events' })}
        </p>
        <DialoguesWidget id={id} choices={Choices} />
      </div>
    )
  }

  return (
    <div className="p-gap">
      <div className="p-gap-choices">
        {Options.map((option, i) => {
          const isChosen = option === Choice;

          return (
            <div className={`p-gap-choice ${isChosen ? 'p-gap-choice--chosen' : ''}`} key={i}>
              <LazyLoadImage2 className="p-gap-choice__icon" callback={getGapImage} name={option} alt={t(`Names.${option}`, { ns: 'gap' })} />
              <GapDescriptions station={station} option={option} />
            </div>
          );
        })}
      </div>
      {littleChat}
    </div>
  );
}

export default GapStation;