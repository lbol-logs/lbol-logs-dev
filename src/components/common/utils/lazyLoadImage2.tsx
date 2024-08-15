import { iconSize } from 'configs/globals';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type TLazyLoadImageArgs = {
  callback: Function,
  name: string,
  alt: string,
  width?: string | number,
  height?: string | number,
  className?: string
};

function LazyLoadImage2({ callback, name, alt, width, height, className }: TLazyLoadImageArgs) {
  const props = {
    width: width || iconSize,
    height: height || iconSize,
    className: className
  };

  const src = callback(name);
  const src2x = callback(name + '@2x');
  const srcset = `${src} 1x, ${src2x} 2x`;

  return (
    <LazyLoadImage
      src={src}
      srcSet={srcset}
      alt={alt}
      {...props}
    />
  );
}

export default LazyLoadImage2;