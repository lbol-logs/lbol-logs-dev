import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { getCardTypeImage } from 'utils/functions/getImage';

function Share() {
  const { setEntityModal } = useContext(CommonContext);

  function onClick() {
    setEntityModal({ share: true });
  }

  return (
    <div className="p-share" onClick={onClick}>
      <LazyLoadImage2 callback={getCardTypeImage} name="Friend" alt="Share" is2x={true} />
    </div>
  );
}

export default Share;