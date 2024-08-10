import { baseUrl, imageUrl } from 'configs/globals';

function getImage(name: string): string {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return`${baseUrl}/images-private/${name}.png`;
  }
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
  getCommonImage,
  getMapImage,
  getControlImage,
  getBossImage,
  getCardImage,
  getExhibitImage
};