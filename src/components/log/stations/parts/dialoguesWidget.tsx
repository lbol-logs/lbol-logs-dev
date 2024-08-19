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

  choices.forEach((choice, i) => {
    const { line, ...options } = current as TObj<TObjAny>;
    current = current[choice];

    const dialogue = (
      <div className="p-dialogue" key={i}>
        <div className="p-dialogue__question">
          <Trans
            i18nKey={`${id}.${line}`}
            ns="dialogues"
            components={components}
          />
        </div>
        <div className="p-dialogue__options">
            {Object.values(options).map((option, i) => {
              const { line } = option;

              return (
                <div className="p-dialogue__option" key={i}>
                  <Trans
                    i18nKey={`${id}.${line}`}
                    ns="dialogues"
                    components={components}
                  />
                  </div>
              );
            })}
        </div>
      </div>
    );
    dialogues.push(dialogue);
  });

  return (
    <div className="p-dialogues">
      {dialogues}
    </div>
  );
}

export default DialoguesWidget;