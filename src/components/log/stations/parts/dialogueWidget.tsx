import { Trans, useTranslation } from 'react-i18next';
import { TDialogueConfigs } from 'utils/types/runData';
import { RevealImage } from './stationWidgets';
import { concatObjects } from 'utils/functions/helpers';
import { TObjString } from 'utils/types/common';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import CharacterShortName from './characterShortName';

function DialogueWidget({ id, dialogueConfigs }: { id: string, dialogueConfigs: TDialogueConfigs }) {
  const { t } = useTranslation();

  const components = {
    h: <span className="u-highlight">{}</span>,
    l: <span className="c-dialogue__height">{}</span>
  };
  const commonProps = { components };

  const questionComponents = { Player: <CharacterShortName /> };
  const questionProps = concatObjects({ components }, { components: questionComponents });

  const { current, next, chosen, props, invalids, befores, cards, exhibits } = dialogueConfigs;

  return (
    <div className="p-dialogue">
      <div className="p-dialogue__question">
        <Trans
          i18nKey={`${id}.${current}`}
          ns="dialogues"
          {...questionProps}
        />
      </div>
      <div className="p-dialogue__options">
          {next.map((option, i) => {
            const isChosen = chosen === i;
            const hasCards = cards && cards[i];
            const hasExhibit = exhibits && exhibits[i];

            let _props;
            if (props && props[i]) {
              _props = concatObjects(props[i], { components });
            }
            else {
              _props = commonProps;
            }
            if (hasExhibit) {
              const values = exhibits[i].reduce((a: TObjString, b, i) => {
                a[i] = t(b, { ns: 'exhibits' });
                return a;
              }, {});
              _props = concatObjects(_props, { values });
            }

            let _tips = null;
            const hasBefores = befores && befores[i];
            if (hasCards || hasExhibit || hasBefores) {
              const _cards = hasCards
                ? <CardCards cards={cards[i]} />
                : null;
              const _exhibit = hasExhibit
                ? <ExhibitCards exhibits={exhibits[i]} />
                : null;
              const _befores = hasBefores
                ? befores[i]
                : null;
              
              _tips = (
                <span className="c-dialogue__tips">
                  <RevealImage />
                  {_befores}
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
                {_tips}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DialogueWidget;