import ExternalLink from 'components/common/parts/externalLink';
import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { ogpBaseUrl } from 'configs/globals';
import { useLocation } from 'react-router-dom';
import { getCommonImage, getOgpImage, getSvg } from 'utils/functions/getImage';

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
            <LazyLoadImage2 className="c-share__svg" callback={getSvg} name="X" alt="X" is1x={true} />
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;