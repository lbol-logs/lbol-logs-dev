import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { useTranslation } from 'react-i18next';
import { getOgpImage } from 'utils/functions/getImage';
import { TShareObj } from 'utils/types/others';

function ShareModal({ share }: { share: TShareObj }) {
  const { t } = useTranslation();

  const { pathname, url } = share;
  const width = 893;
  const height = 469;

  return (
    <div className="p-modal__share">
      <div className="p-modal__line">
        {/* <span className="p-modal__name">{t(`${Id}.Name`, { ns })}</span> */}
      </div>
      <div className="p-modal__body">
        <LazyLoadImage2 className="c-share_ogp" callback={getOgpImage} name={pathname} width={width} height={height} alt="" is1x={true} />
        <input className="c-share__url" value={url} readOnly />
        <div className="c-share__buttons">
          <span>copy</span>
          <span>Discord</span>
          <span>X</span>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;