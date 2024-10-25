import { ogpBaseUrl } from 'configs/globals';
import { CommonContext } from 'contexts/commonContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

function Share() {
  const { setEntityModal } = useContext(CommonContext);
  const { pathname, search } = useLocation();

  function onClick() {
    const url = ogpBaseUrl + pathname + search;
    const share = { pathname, url };
    console.log(share);
    setEntityModal({ share });
  }

  return (
    <div className="p-share" onClick={onClick}>
      share
    </div>
  );
}

export default Share;