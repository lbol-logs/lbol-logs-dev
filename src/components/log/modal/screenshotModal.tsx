import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';

function ScreenshotModal({ screenshot }: { screenshot: string }) {
  const type = 'image/png';
  const name = 'LBoL.png';

  async function copy() {
    const blob = await (await fetch(screenshot)).blob();
    navigator.clipboard.write([
      new ClipboardItem({
          [type]: blob
      })
    ]);
  }

  async function share() {
    const blob = await (await fetch(screenshot)).blob();
    const file = new File([blob], name, { type });
    navigator.share({
      files: [file]
    })
  }

  function save() {
    const downloadLink = document.createElement('a');
    if (typeof downloadLink.download === 'string') {
      downloadLink.href = screenshot;
      downloadLink.download = name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    else {
      window.open(screenshot);
    }
  }

  return (
    <div className="p-modal__screenshot">
      <div className="p-modal__body">
        <img src={screenshot} alt="" />
        <div className="c-share__buttons">
          <span className="c-share__button" onClick={copy}>
            <LazyLoadImage2 callback={getCommonImage} name="Copy" alt="Copy" />
          </span>
          <span className="c-share__button" onClick={share}>
            <LazyLoadImage2 callback={getCommonImage} name="Share" alt="Share" />
          </span>
          <span className="c-share__button" onClick={save}>
            <LazyLoadImage2 className="c-share__button--save" callback={getControlImage} name="Arrow" alt="Save" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScreenshotModal;