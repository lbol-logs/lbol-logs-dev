import { baseUrl, imageUrl } from 'configs/globals';

function getImage(name: string): string {
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   return`${baseUrl}/images-private/${name}.png`;
  // }
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
  return _getImage('common/avatars', name);
}

function getDifficultyImage(name: string): string {
  return _getImage('common/difficulties', name);
}

function getResultImage(name: string): string {
  return _getImage('common/result', name);
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
  getResultImage
};