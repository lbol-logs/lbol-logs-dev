import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TDialoguesConfigs } from 'utils/types/runData';

function DialoguesWidget({ id, dialoguesConfigs }: { id: string, dialoguesConfigs: TDialoguesConfigs }) {

  useTranslation();

  const dialogues: Array<ReactNode> = [];

  const components = {
    h: <span className="u-orange">{}</span>,
    // TODO: line-height
  };
  const commonProps = { components };

  for (let i = 0; i < dialoguesConfigs.length; i++) {
    const { id, current, next, chosen, props, randoms } = dialoguesConfigs[i];
    const _props = Object.assign(props || {}, commonProps);

    const dialogue = (
      <div className="p-dialogue" key={i}>
        <div className="p-dialogue__question">
          <Trans
            i18nKey={`${id}.${current}`}
            ns="dialogues"
            {..._props}
          />
        </div>
        <div className="p-dialogue__options">
            {next.map((option, i) => {
              const isChosen = chosen === i;
              let random = null;
              if (randoms && randoms[i]) {
                random = randoms[i];
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
    dialogues.push(dialogue);
  }

  return (
    <div className="p-dialogues">
      {dialogues}
    </div>
  );
}

export default DialoguesWidget;