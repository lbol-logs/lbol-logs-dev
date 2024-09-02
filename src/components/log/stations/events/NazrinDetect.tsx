import { TDialogueConfigs, TStation } from 'utils/types/runData';
import DialogueWidget from '../parts/dialogueWidget';
import { useContext } from 'react';
import { TObjAny } from 'utils/types/common';
import { getNext } from 'utils/functions/helpers';
import { LogContext } from 'contexts/logContext';
import RewardsWidget from '../parts/rewardsWidget';
import EventHead from '../parts/eventHead';
import { getNazrinImage } from 'utils/functions/getImage';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { Trans, useTranslation } from 'react-i18next';
import { MoneyImage } from '../parts/stationWidgets';

function NazrinDetect({ station }: { station: TStation }) {
  const { configsData } = useContext(LogContext);
  useTranslation();

  const { Data, Id } = station;

  const { Choices } = Data;

  const id = Id as string;
  const configs = configsData.dialogues[id];
  const eventConfigs = configsData.events[id];

  let first = null;
  let second = null;

  {
    const { current, next: options } = configs[0];
    const { money } = eventConfigs;

    const [next] = getNext(options);
    const chosen = Choices[0];

    const props: Array<TObjAny> = [];

    const values = { 0: money };
    props[0] = { values };

    const dialogueConfigs: TDialogueConfigs = {
      current,
      next,
      chosen,
      props
    };

    first = <DialogueWidget id={id} dialogueConfigs={dialogueConfigs} />;
  }

  {
    const { Result } = Data;
    if (Result !== undefined) {
      const { coins } = eventConfigs;

      const props: Array<TObjAny> = [];
      const values = { 0: coins };
      const components = { Money: <MoneyImage /> };
      props[0] = { values, components };

      const results = {
        0: "1",
        1: "2",
        2: "5",
        3: "6",
        4: "3",
        5: "4"
      };

      second = (
        <div className="p-nazrin-results">
          {Object.entries(results).map(([result, name]) => {
            const isChosen = Number(result) === Result;
            const line = configs[1][result];
            const key = `${id}.${line}`;

            return (
              <div className={`p-nazrin-result ${isChosen ? 'p-nazrin-result--chosen' : 'p-nazrin-result--invalid'}`} key={result}>
                <LazyLoadImage2 className="p-nazrin-result__icon" callback={getNazrinImage} name={name} alt="" />
                <div className="p-nazrin-result__descs">
                  <Trans
                    i18nKey={key}
                    ns="dialogues"
                    {...props[Number(result)]}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="p-station__body">
      <div className="p-station__main">
        <div className="p-event">
          <EventHead id={id} />
          <div className="p-event__body">
            <div className="p-dialogues">
              {first}
              {second}
            </div>
          </div>
        </div>
      </div>
      <RewardsWidget station={station} />
    </div>
  );
}

export default NazrinDetect;