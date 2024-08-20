import { LogContext } from 'contexts/logContext';
import { ReactNode, useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { TObj, TObjAny, TRange3 } from 'utils/types/common';

function DialoguesWidget({ id, choices }: { id: string, choices: Array<TRange3> }) {
  useTranslation();
  const { configsData } = useContext(LogContext);

  const dialogueConfigs = configsData.dialogues;
  const dialogues: Array<ReactNode> = [];
  let current = dialogueConfigs[id];
  const components = { h: <span className="u-orange">{}</span> };
  const props = { components };

  for (let i = 0; i < choices.length; i++) {
    const { line, ...options } = current as TObj<TObjAny>;
    const choice = String(choices[i]);
    if (!(choice in current)) break;
    current = current[choice];

    const dialogue = (
      <div className="p-dialogue" key={i}>
        <div className="p-dialogue__question">
          <Trans
            i18nKey={`${id}.${line}`}
            ns="dialogues"
            {...props}
          />
        </div>
        <div className="p-dialogue__options">
            {Object.entries(options).map(([key, option], i) => {
              const { line } = option;
              const isChosen = choice === key;

              return (
                <div className={`p-dialogue__option ${isChosen ? 'p-dialogue__option--chosen' : ''}`} key={i}>
                  <Trans
                    i18nKey={`${id}.${line}`}
                    ns="dialogues"
                    {...props}
                  />
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