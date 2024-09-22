import { LogContext } from 'contexts/logContext';
import { useContext } from 'react';

function Modal() {
  const { entityModal } = useContext(LogContext);
  const { card, exhibit, statusEffect } = entityModal;

  let inner = null;

  if (card) inner = null;
  else if (exhibit) inner = null;
  else if (statusEffect) inner = null;

  return (
    <div className="p-modal">
      <div className="p-modal--inner">
        {inner}
      </div>
    </div>
  )
}

export default Modal;