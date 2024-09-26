import { iconSize } from 'configs/globals';
import { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage } from 'utils/functions/getImage';
import { TObjAny, TObjString } from 'utils/types/common';

type TLazyLoadImageArgs = {
  callback: Function,
  name: string,
  alt: string,
  width?: string | number,
  height?: string | number,
  className?: string
  props?: TObjAny
};

export type {
  TLazyLoadImageArgs
};

function LazyLoadImage2({ callback, name, alt, width, height, className, props = {} }: TLazyLoadImageArgs) {
  const [srcs, setSrcs] = useState({} as { src: string, srcSet: string });

  const fakeIcons: TObjString = {
    getCardImage: 'FakeCardImage',
    getExhibitImage: 'FakeExhibitIcon',
    getStatusEffectImage: 'FakeStatusEffectIcon'
  };

  const _props = {
    width: width || iconSize,
    height: height || iconSize,
    className: className
  };
  Object.assign(_props, props);
  if (alt !== '') Object.assign(_props, { title: alt });

  function getSrcs(callback: Function, name: string) {
    const src = callback(name);
    const src2x = callback(name + '@2x');
    const srcSet = `${src} 1x, ${src2x} 2x`;
    setSrcs({ src, srcSet });
  }

  useMemo(() => getSrcs(callback, name), [callback, name, alt, width, height, className]);
  const { src, srcSet } = srcs;

  return (
    <LazyLoadImage
      src={src}
      srcSet={srcSet}
      alt={alt}
      onError={() => {
        const fakeIcon = fakeIcons[callback.name];
        if (fakeIcon) getSrcs(getCommonImage, fakeIcon);
      }}
      {..._props}
    />
  );
}

export default LazyLoadImage2;