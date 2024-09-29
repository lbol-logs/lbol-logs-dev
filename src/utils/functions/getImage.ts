import { imagesUrl } from 'configs/globals';

function getImage(name: string) {
  return `${imagesUrl}/${name}.avif`;
}

function _getImage(path: string, name: string) {
  return getImage(`${path}/${name}`);
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

function getBossImage(name: string) {
  return _getImage('boss', name);
}

function getExhibitImage(name: string) {
  return _getImage('exhibits', name);
}

function getAvatarImage(name: string) {
  return _getImage('avatars', name);
}

function getDifficultyImage(name: string) {
  return _getImage('difficulties', name);
}

function getResultImage(name: string) {
  return _getImage('results', name);
}

function getSpellcardImage(name: string) {
  return _getImage('spellcards', name);
}

function getGapImage(name: string) {
  return _getImage('gap', name);
}

function getEventImage(name: string) {
  return _getImage('events', name);
}

function getUnitImage(name: string) {
  return _getImage('units', name);
}

function getStationImage(name: string) {
  return _getImage('station', name);
}

function getStatusEffectImage(name: string) {
  return _getImage('statusEffects', name);
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

function getCardWatermarkImage(name: string) {
  return _getImage('cards/watermarks', name);
}

function getCardTypeImage(name: string) {
  return _getImage('cards/types', name);
}

function getCardArtImage(name: string) {
  return _getImage('cards/arts', name);
}

function getUnityImage(name: string) {
  return _getImage('cards/unities', name);
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
  getUnityImage
};