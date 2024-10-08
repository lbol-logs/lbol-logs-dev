import { iconSize } from 'configs/globals';
import { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage, getCardArtImage, getExhibitImage, getStatusEffectImage, getResultImage } from 'utils/functions/getImage';
import { TObj } from 'utils/types/common';

type TLazyLoadImageArgs = {
  callback: Function,
  name: string,
  alt: string,
  width?: string | number,
  height?: string | number,
  className?: string,
  isMod?: boolean,
  is2x?:  boolean
};

export type {
  TLazyLoadImageArgs
};

function LazyLoadImage2({ callback, name, alt, width, height, className, isMod = false, is2x = false }: TLazyLoadImageArgs) {
  const [srcs, setSrcs] = useState({} as { src: string, srcSet: string | undefined });

  const props = {
    width: width || iconSize,
    height: height || iconSize,
    className: className
  };
  if (alt !== '') Object.assign(props, { title: alt });

  function getSrcs(callback: Function, name: string, isMod: boolean = false) {
    const _name = is2x ? `${name}@2x` : name;
    const src = callback(_name, isMod);
    let srcSet;
    if (!is2x) {
      const src2x = callback(name + '@2x', isMod);
      srcSet = `${src} 1x, ${src2x} 2x`;
    }
    setSrcs({ src, srcSet });
  }

  useMemo(() => getSrcs(callback, name, isMod), [callback, name, alt, width, height, className]);
  const { src, srcSet } = srcs;

  return (
    <LazyLoadImage
      src={src}
      srcSet={srcSet}
      alt={alt}
      onError={(e) => {
        if (callback === getResultImage) (e.target as HTMLImageElement).outerHTML = '';
        const fakeIcon = getFakeIcon(callback);
        if (fakeIcon) getSrcs(getCommonImage, fakeIcon);
      }}
      {...props}
    />
  );
}

export default LazyLoadImage2;

function getFakeIcon(callback: Function) {
  const fakeIcons: TObj<Function> = {
    FakeCardImage: getCardArtImage,
    FakeExhibitIcon: getExhibitImage,
    FakeStatusEffectIcon: getStatusEffectImage
  };

  const fakeIcon = Object.entries(fakeIcons).find(([_, fn]) => fn === callback);
  if (!fakeIcon) return;
  const name = fakeIcon[0];
  return name;
}