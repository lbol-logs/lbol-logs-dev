import ExternalLink from 'components/common/parts/externalLink';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { ogpBaseUrl } from 'configs/globals';
import { useLocation } from 'react-router-dom';
import { getCommonImage, getOgpImage } from 'utils/functions/getImage';

function ShareModal() {
  const { pathname, search } = useLocation();

  const url = ogpBaseUrl + pathname + search;

  const width = 893;
  const height = 469;

  function copy() {
    navigator.clipboard.writeText(url);
  }

  function share() {
    navigator.share({ url });
  }

  return (
    <div className="p-modal__share">
      <div className="p-modal__body">
        <LazyLoadImage2 className="c-share_ogp" callback={getOgpImage} name={pathname} width={width} height={height} alt="" is1x={true} />
        <div className="c-share__url">
          <span>{url}</span>
        </div>
        <div className="c-share__buttons">
          <span className="c-share__button" onClick={copy}>
            <LazyLoadImage2 callback={getCommonImage} name="Copy" alt="Copy" />
          </span>
          {/* <span className="c-share__button" onClick={copy}></span> */}
          <span className="c-share__button" onClick={share}>
            <LazyLoadImage2 callback={getCommonImage} name="Share" alt="Share" />
          </span>
          <ExternalLink className="c-share__button" href={`https://twitter.com/intent/tweet?url=${url}`}>
            <svg className="c-share__svg" width="1200" height="1227" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
            </svg>

          </ExternalLink>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;