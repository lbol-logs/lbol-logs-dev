import { baseUrl, imagesUrl } from 'configs/globals';

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

function getCardImage(name: string) {
  return _getImage('cards', name);
}

// TODO
function getTestImage(name: string) {
  return `${baseUrl}/test/${name.replace('@2x', '')}.png`;
}

export {
  getImage,
  getCommonImage,
  getMapImage,
  getControlImage,
  getBaseManaImage,
  getCardManaImage,
  getBossImage,
  getCardImage,
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
  getTestImage
};