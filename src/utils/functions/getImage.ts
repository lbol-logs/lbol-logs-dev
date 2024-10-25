import { imagesUrl, modsImagesUrl, ogpBaseUrl } from 'configs/globals';

function getImage(name: string, isMod: boolean = false) {
  const baseUrl = isMod ? modsImagesUrl : imagesUrl;
  return `${baseUrl}/${name}.avif`;
}

function _getImage(path: string, name: string, isMod: boolean = false) {
  return getImage(`${path}/${name}`, isMod);
}

function getCommonImage(name: string) {
  return _getImage('common', name);
}

function getMapImage(name: string) {
  return _getImage('map', name);
}

function getControlImage(name: string) {
  return _getImage('control', name);
}

function getBaseManaImage(name: string) {
  return _getImage('mana/baseMana', name);
}

function getCardManaImage(name: string) {
  return _getImage('mana/cardMana', name);
}

function getBossImage(name: string, isMod: boolean = false) {
  return _getImage('boss', name, isMod);
}

function getExhibitImage(name: string, isMod: boolean = false) {
  return _getImage('exhibits', name, isMod);
}

function getAvatarImage(name: string, isMod: boolean = false) {
  return _getImage('avatars', name, isMod);
}

function getDifficultyImage(name: string) {
  return _getImage('difficulties', name);
}

function getResultImage(name: string, isMod: boolean = false) {
  return _getImage('results', name, isMod);
}

function getSpellcardImage(name: string, isMod: boolean = false) {
  return _getImage('spellcards', name, isMod);
}

function getGapImage(name: string) {
  return _getImage('gap', name);
}

function getEventImage(name: string) {
  return _getImage('events', name);
}

function getUnitImage(name: string, isMod: boolean = false) {
  return _getImage('units', name, isMod);
}

function getStationImage(name: string) {
  return _getImage('station', name);
}

function getStatusEffectImage(name: string, isMod: boolean = false) {
  return _getImage('statusEffects', name, isMod);
}

function getNazrinImage(name: string) {
  return _getImage('nazrin', name);
}

function getIntentionImage(name: string) {
  return _getImage('intentions', name);
}

function getCardFrameImage(name: string) {
  return _getImage('cards/frames', name);
}

function getCardWatermarkImage(name: string, isMod: boolean = false) {
  return _getImage('cards/watermarks', name, isMod);
}

function getCardTypeImage(name: string) {
  return _getImage('cards/types', name);
}

function getCardArtImage(name: string, isMod: boolean = false) {
  return _getImage('cards/arts', name, isMod);
}

function getUnityImage(name: string) {
  return _getImage('cards/unities', name);
}

function getOgpImage(pathname: string) {
  return [
    ogpBaseUrl,
    '/ogp',
    pathname.slice(0, -1),
    '.png'
  ].join('');
}

function getSvg(name: string) {
  return `${imagesUrl}/common/${name}.svg`;
}

export {
  getImage,
  getCommonImage,
  getMapImage,
  getControlImage,
  getBaseManaImage,
  getCardManaImage,
  getBossImage,
  getCardArtImage,
  getExhibitImage,
  getAvatarImage,
  getDifficultyImage,
  getResultImage,
  getSpellcardImage,
  getGapImage,
  getEventImage,
  getUnitImage,
  getStationImage,
  getStatusEffectImage,
  getNazrinImage,
  getIntentionImage,
  getCardFrameImage,
  getCardWatermarkImage,
  getCardTypeImage,
  getUnityImage,
  getOgpImage,
  getSvg
};