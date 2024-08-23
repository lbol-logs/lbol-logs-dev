import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { Trans, useTranslation } from 'react-i18next';
import { getCommonImage } from 'utils/functions/getImage';
import { TDialogueConfigs } from 'utils/types/runData';

function DialogueWidget({ id, dialogueConfigs }: { id: string, dialogueConfigs: TDialogueConfigs }) {

  useTranslation();

  const components = {
    h: <span className="u-highlight">{}</span>,
    l: <span className="c-dialogue__height">{}</span>
  };
  const commonProps = { components };

  const { current, next, chosen, props, randoms } = dialogueConfigs;

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
            let _props = commonProps;
            if (props) {
              _props = Object.assign(_props, props[i] || {});
            }
            let random = null;
            if (randoms && randoms[i]) {
              random = (
                <span className="c-dialogue__random">
                  <LazyLoadImage2 callback={getCommonImage} name="Reveal" alt="" />
                  {randoms[i]}
                </span>
              );
            }

            return (
              <div className={`p-dialogue__option ${isChosen ? 'p-dialogue__option--chosen' : ''}`} key={i}>
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