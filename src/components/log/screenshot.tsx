import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { CommonContext } from 'contexts/commonContext';
import html2canvas from 'html2canvas-pro';
import { useContext } from 'react';
import { getCommonImage } from 'utils/functions/getImage';

function Screenshot() {
  const { setEntityModal } = useContext(CommonContext);

  const type = 'image/png';

  function onClick() {
    const target = document.body;
    const options = {
      x: window.scrollX,
      y: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight
    };

    const style = document.createElement('style');
    document.head.appendChild(style);
    const css = style.sheet as CSSStyleSheet;
    css.insertRule('.c-entity{box-shadow:none}');

    html2canvas(target, options).then((canvas: HTMLCanvasElement) => {
      const screenshot = canvas.toDataURL(type);
      style.remove();
      setEntityModal({ screenshot });
    });
  }

  return (
    <div className="p-screenshot" onClick={onClick} data-html2canvas-ignore="true">
      <LazyLoadImage2 callback={getCommonImage} name="Screenshot" alt="Screenshot" />
    </div>
  );
}
export default Screenshot;