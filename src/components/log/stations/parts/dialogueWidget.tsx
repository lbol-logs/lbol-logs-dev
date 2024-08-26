import { Trans, useTranslation } from 'react-i18next';
import { TDialogueConfigs } from 'utils/types/runData';
import { RevealImage } from './stationWidgets';

function DialogueWidget({ id, dialogueConfigs }: { id: string, dialogueConfigs: TDialogueConfigs }) {

  useTranslation();

  const components = {
    h: <span className="u-highlight">{}</span>,
    l: <span className="c-dialogue__height">{}</span>
  };
  const commonProps = { components };

  const { current, next, chosen, props, randoms, invalids } = dialogueConfigs;

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
            let _props = {};
            if (props && props[i]) {
              const _components = Object.assign({}, props[i].components, components);
              Object.assign(_props, props[i], { components: _components });
            }
            else {
              _props = commonProps;
            }
            let random = null;
            if (randoms && randoms[i]) {
              random = (
                <span className="c-dialogue__random">
                  <RevealImage />
                  {randoms[i]}
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
                {random}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DialogueWidget;