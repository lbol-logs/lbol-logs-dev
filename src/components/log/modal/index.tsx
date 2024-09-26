import { LogContext } from 'contexts/logContext';
import { useContext, useEffect, useRef } from 'react';
import CardModal from './cardModal';
import ExhibitModal from './exhibitModal';
import StatusEffectModal from './statusEffectModal';

function Modal() {
  const { entityModal, setEntityModal } = useContext(LogContext);
  const { card, exhibit, statusEffect } = entityModal;

  let type;
  let entity;

  if (card) {
    type = 'card';
    entity = <CardModal card={card} />;
  }
  else if (exhibit) {
    type = 'exhibit';
    entity = <ExhibitModal exhibit={exhibit} />;
  }
  else if (statusEffect) {
    type = 'status-effect';
    entity = <StatusEffectModal statusEffect={statusEffect} />;
  }

  // TODO
  function onBlur() {
    setEntityModal({});
  }

  const innerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const inner = innerRef.current;
    if (inner) inner.focus();
  }, [entity]);

  if (entity) {
    return (
      <div className="p-modal">
        <div className="p-modal__outer">
          <div className={`p-modal__inner p-modal__inner--${type}`} tabIndex={0} onBlur={onBlur} ref={innerRef}>
            {entity}
          </div>
        </div>
      </div>
    )
  }
  else {
    return null;
  }
}

export default Modal;