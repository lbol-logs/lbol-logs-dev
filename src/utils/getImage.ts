import { imageUrl } from 'configs/globals';

function getImage(name: string): string {
  return `${imageUrl}/${name}.avif`;
}

function _getImage(path: string, name: string): string {
  return getImage(`${path}/${name}`);
}

function getMapImage(name: string): string {
  return _getImage('map', name);
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

export {
  getImage,
  getMapImage,
  getCardImage,
  getExhibitImage
};