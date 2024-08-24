import { imageUrl } from 'configs/globals';

function getImage(name: string): string {
  return `${imageUrl}/${name}.avif`;
}

function _getImage(path: string, name: string): string {
  return getImage(`${path}/${name}`);
}

function getCommonImage(name: string): string {
  return _getImage('common', name);
}

function getMapImage(name: string): string {
  return _getImage('map', name);
}

function getControlImage(name: string): string {
  return _getImage('control', name);
}

function getManaImage(name: string): string {
  return _getImage('mana', name);
}

function getBossImage(name: string): string {
  return _getImage('boss', name);
}

function getCardImage(name: string): string {
  return _getImage('cards', name);
}

function getExhibitImage(name: string): string {
  return _getImage('exhibits', name);
}

function getAvatarImage(name: string): string {
  return _getImage('avatars', name);
}

function getDifficultyImage(name: string): string {
  return _getImage('difficulties', name);
}

function getResultImage(name: string): string {
  return _getImage('results', name);
}

function getSpellcardImage(name: string): string {
  return _getImage('spellcards', name);
}

function getGapImage(name: string): string {
  return _getImage('gap', name);
}

function getEventImage(name: string): string {
  return _getImage('events', name);
}

function getEnemyImage(name: string): string {
  return _getImage('enemies', name);
}

function getStationImage(name: string): string {
  return _getImage('station', name);
}

export {
  getImage,
  getCommonImage,
  getMapImage,
  getControlImage,
  getManaImage,
  getBossImage,
  getCardImage,
  getExhibitImage,
  getAvatarImage,
  getDifficultyImage,
  getResultImage,
  getSpellcardImage,
  getGapImage,
  getEventImage,
  getEnemyImage,
  getStationImage
};