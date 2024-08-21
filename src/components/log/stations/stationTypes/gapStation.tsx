import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getExhibitImage, getGapImage } from 'utils/functions/getImage';
import { TStation } from 'utils/types/runData';
import GapDescriptions from '../parts/gapDescriptions';
import { TRange3 } from 'utils/types/common';
import DialoguesWidget from '../parts/dialoguesWidget';
import RewardsWidget from '../parts/rewardsWidget';

function GapStation({ station }: { station: TStation }) {
  const { Type, Data } = station;
  const { Choice, Options, Choices } = Data as { Choice: string, Options: Array<string>, Choices: Array<TRange3> };
  const { t } = useTranslation();

  let littleChat = null;

  if (Choices) {
    const id = 'YukariProvide';
    const title = t(`${id}.Title`, { ns: 'events' });
    const exhibit1 = 'JingjieGanzhiyi';
    const exhibit2 = 'WaijieYanshuang';

    if (Choices[0] === 2) Choices[0] = 1;

    littleChat = (
      <div className="p-gap-little-chat">
        <p className="p-gap-little-chat__title">
          <LazyLoadImage2 className="p-gap-little-chat__exhibit-1" callback={getExhibitImage} name={exhibit1} alt={t(exhibit1, { ns: 'exhibits' })} />
          <LazyLoadImage2 className="p-gap-little-chat__exhibit-2" callback={getExhibitImage} name={exhibit2} alt={t(exhibit2, { ns: 'exhibits' })} />
          <span className="p-gap-little-chat__text">{title}</span>
        </p>
        <DialoguesWidget id={id} choices={Choices} />
      </div>
    )
  }

  const isGetRareCard = Choice === 'GetRareCard';
  const additionalCards = isGetRareCard ? Data.ShanliangDengpao : null;

  return (
    <div className="p-station__body">
      <div className="p-station__main">
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
      </div>
      <RewardsWidget station={station} additionalCards={additionalCards} />
    </div>
  );
}

export default GapStation;