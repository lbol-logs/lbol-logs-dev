import { Trans, useTranslation } from 'react-i18next';
import { TDialogueConfigs, TExhibit, TExhibits } from 'utils/types/runData';
import { RevealImage } from './stationWidgets';
import { concatObjects } from 'utils/functions/helpers';
import { TObjString } from 'utils/types/common';
import ExhibitImages from 'components/common/parts/exhibitImages';
import CardCards from 'components/log/entityCards/cardCards';

function DialogueWidget({ id, dialogueConfigs }: { id: string, dialogueConfigs: TDialogueConfigs }) {
  const { t } = useTranslation();

  const components = {
    h: <span className="u-highlight">{}</span>,
    l: <span className="c-dialogue__height">{}</span>
  };
  const commonProps = { components };

  const { current, next, chosen, props, tips, invalids, cards, exhibits } = dialogueConfigs;

  return (
    <div className="p-dialogue">
      <div className="p-dialogue__question">
        <Trans
          i18nKey={`${id}.${current}`}
          ns="dialogues"
          {...commonProps}
        />
      </div>
      <div className="p-dialogue__options">
          {next.map((option, i) => {
            const isChosen = chosen === i;
            const hasCards = cards && cards[i];
            const hasExhibit = exhibits && exhibits[i];
            let _exhibits: TExhibits = [];

            let _props;
            if (props && props[i]) {
              _props = concatObjects(props[i], { components });
            }
            else {
              _props = commonProps;
            }
            if (hasExhibit) {
              if (typeof exhibits[i] === 'string') _exhibits = [exhibits[i] as TExhibit];
              else _exhibits = exhibits[i] as TExhibits;

              const values = _exhibits.reduce((a: TObjString, b, i) => {
                a[i] = t(b, { ns: 'exhibits' });
                return a;
              }, {});
              _props = concatObjects(_props, { values });
            }

            let tip = null;
            const hasTip = tips && tips[i];
            if (hasTip || hasCards || hasExhibit) {
              const _tip = hasTip ? tips[i] : null;
              const _cards = hasCards
                ? <CardCards cards={cards[i]} />
                : null;
              const _exhibit = hasExhibit
                ? <ExhibitImages className="c-exhibit__img" exhibits={_exhibits} alt="" />
                : null;
              tip = (
                <span className="c-dialogue__tip">
                  <RevealImage />
                  {_tip}
                  {_cards}
                  {_exhibit}
                </span>
              );
            }

            const isInvalid = invalids ? invalids.includes(i) : false;

            return (
              <div className={`p-dialogue__option ${isInvalid ? 'p-dialogue__option--invalid' : ''} ${isChosen ? 'p-dialogue__option--chosen' : ''}`} key={i}>
                <Trans
                  i18nKey={`${id}.${option}`}
                  ns="dialogues"
                  {..._props}
                />
                {tip}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DialogueWidget;