import { Trans, useTranslation } from 'react-i18next';
import { TDialogueConfigs } from 'utils/types/runData';
import { MoneyImage, PowerImage, RevealImage } from './stationWidgets';
import { concatObjects } from 'utils/functions/helpers';
import { TObjString } from 'utils/types/common';
import CardCards from 'components/log/entityCards/cardCards';
import ExhibitCards from 'components/log/entityCards/exhibitCards';
import CharacterShortName from './characterShortName';
import Highlight from './highlight';

function DialogueWidget({ id, dialogueConfigs }: { id: string, dialogueConfigs: TDialogueConfigs }) {
  const { t } = useTranslation();

  const components = {
    h: <Highlight>{}</Highlight>,
    hg: <Highlight color="g">{}</Highlight>,
    l: <span className="c-dialogue__height">{}</span>,
    Money: <MoneyImage />,
    Power: <PowerImage />
  };
  const commonProps = { components };

  const { current, currentComponents, next, chosen, props, invalids, befores, cards, exhibits, afters } = dialogueConfigs;

  const questionComponents = { Player: <CharacterShortName />, ...(currentComponents || {}) };
  const questionProps = concatObjects({}, { components }, { components: questionComponents });

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

            let _props = {};
            let offset = 0;
            if (props && props[i]) {
              _props = concatObjects({}, props[i], { components });
              const { values } = props[i];
              if (values && Object.keys(values).includes("0")) offset += 1;
            }
            else {
              _props = concatObjects(_props, commonProps);
            }

            if (hasCards) {
              const values = cards[i].reduce((a: TObjString, b, i) => {
                a[i + offset] = t(b.Id, { ns: 'cards' });
                return a;
              }, {});
              console.log('before', {offset});
              offset += cards[i].length;
              console.log('after', {offset});
              _props = concatObjects(_props, { values });
            }

            if (hasExhibit) {
              const values = exhibits[i].reduce((a: TObjString, b, i) => {
                a[i + offset] = t(b, { ns: 'exhibits' });
                return a;
              }, {});
              _props = concatObjects(_props, { values });
            }

            let _tips = null;
            const hasBefores = befores && befores[i];
            const hasAfters = afters && afters[i];
            if (hasCards || hasExhibit || hasBefores || hasAfters) {
              const _befores = hasBefores
              ? befores[i]
              : null;
              const _cards = hasCards
                ? <CardCards cards={cards[i]} />
                : null;
              const _exhibit = hasExhibit
                ? <ExhibitCards exhibits={exhibits[i]} />
                : null;
              const _afters = hasAfters
                ? afters[i]
                : null;

              _tips = (
                <span className="c-dialogue-tips">
                  <RevealImage />
                  <div className="c-dialogue-tips__body">
                    {_befores}
                    {_cards}
                    {_exhibit}
                    {_afters}
                  </div>
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