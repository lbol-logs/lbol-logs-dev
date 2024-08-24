import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getGapImage } from 'utils/functions/getImage';
import { TDialogueConfigs, TStation } from 'utils/types/runData';
import GapDescriptions from '../parts/gapDescriptions';
import { TRange3 } from 'utils/types/common';
import DialogueWidget from '../parts/dialogueWidget';
import RewardsWidget from '../parts/rewardsWidget';
import { useContext } from 'react';
import { LogContext } from 'contexts/logContext';
import { getNext } from 'utils/functions/helpers';
import ExhibitImage from 'components/common/parts/exhibitImage';

function GapStation({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  const { Data } = station;
  const { Choice, Options, Choices } = Data as { Choice: string, Options: Array<string>, Choices: Array<TRange3> };
  const { t } = useTranslation();

  let littleChat = null;

  if (Choices) {
    const id = 'YukariProvide';
    const title = t(`${id}.Title`, { ns: 'events' });
    const exhibit1 = 'JingjieGanzhiyi';
    const exhibit2 = 'WaijieYanshuang';

    const configs = configsData.dialogues[id];
    const { current, next: _next } = configs;
    const next = getNext(_next);
    const chosen = Choices[0] === 2 ? 1 : Choices[0];

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen
    };

    littleChat = (
      <div className="p-gap-little-chat">
        <p className="p-gap-little-chat__title">
          <ExhibitImage className="p-gap-little-chat__exhibit-1" exhibit={exhibit1} />
          <ExhibitImage className="p-gap-little-chat__exhibit-2" exhibit={exhibit2} />
          <span className="p-gap-little-chat__text">{title}</span>
        </p>
        <div className="p-dialogues">
          <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />
        </div>
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