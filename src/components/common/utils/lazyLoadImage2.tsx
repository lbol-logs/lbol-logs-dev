import { configsData, iconSize, modsConfigsData } from 'configs/globals';
import { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCommonImage, getCardArtImage, getExhibitImage, getStatusEffectImage, getSpellcardImage, getAvatarImage, getResultImage } from 'utils/functions/getImage';
import { checkIsMod } from 'utils/functions/helpers';
import { TObj, TObjAny } from 'utils/types/common';

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

  const _props = {
    width: width || iconSize,
    height: height || iconSize,
    className: className
  };
  Object.assign(_props, props);
  if (alt !== '') Object.assign(_props, { title: alt });

  function getSrcs(callback: Function, name: string, isMod: boolean = false) {
    const src = callback(name, isMod);
    const src2x = callback(name + '@2x', isMod);
    const srcSet = `${src} 1x, ${src2x} 2x`;
    setSrcs({ src, srcSet });
  }

  let isMod = false;
  switch (callback) {
    case getSpellcardImage: {
      const character = name.slice(0, -1);
      isMod = checkIsMod(character);
      break;
    }
    case getAvatarImage: {
      isMod = checkIsMod(name);
      break;
    }
    case getResultImage: {
      if (name === 'bg') break;
      const character = name.replace(/(Failure|Normal|TrueEnd)$/, '');
      isMod = checkIsMod(character);
      break;
    }
    case getCardArtImage: {
      const { cardsConfigs } = configsData;
      isMod = cardsConfigs.get(name) === undefined;
      break;
    }
    case getExhibitImage: {
      const { exhibitsConfigs } = configsData;
      isMod = exhibitsConfigs.get(name) === undefined;
      break;
    }
    case getStatusEffectImage: {
      const { statusEffectsConfigs } = modsConfigsData;
      isMod = statusEffectsConfigs.get(name) !== undefined;
      break;
    }
  }

  useMemo(() => getSrcs(callback, name, isMod), [callback, name, alt, width, height, className]);
  const { src, srcSet } = srcs;

  return (
    <LazyLoadImage
      src={src}
      srcSet={srcSet}
      alt={alt}
      onError={() => {
        const fakeIcon = getFakeIcon(callback);
        if (fakeIcon) getSrcs(getCommonImage, fakeIcon);
      }}
      {..._props}
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