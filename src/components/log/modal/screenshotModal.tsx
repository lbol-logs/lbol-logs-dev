import LazyLoadImage2 from 'components/common/utils/lazyLoadImage2';
import { screenshotConfigs } from 'configs/globals';
import { getCommonImage, getControlImage } from 'utils/functions/getImage';

function ScreenshotModal({ screenshot }: { screenshot: string }) {
  const { type, name } = screenshotConfigs;

  let blob: Blob;
  let file: File;

  async function getBlob() {
    if (blob === undefined) {
      blob = await (await fetch(screenshot)).blob();
    }
    return blob;
  }

  async function copy() {
    const makeImagePromise = async () => await getBlob();
    await navigator.clipboard.write(
      [new ClipboardItem({[type]: makeImagePromise() })]
    )
  }

  async function share() {
    if (file === undefined) {
      const blob = await getBlob();
      file = new File([blob], name, { type });
    }
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
            <LazyLoadImage2 className="c-share__button-img--save" callback={getControlImage} name="Arrow" alt="Save" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScreenshotModal;