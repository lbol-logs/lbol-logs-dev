import MapNodes from 'utils/classes/MapNodes';
import { TLevel } from 'utils/types/runData';

function scrollToLevel(nextLevel: TLevel, showMap: boolean, scrollToY = true) {
  if (showMap) {
    const inner = document.querySelector('.js-mapInner') as HTMLDivElement;
    if (inner) {
      const { gap, length } = MapNodes.mapOptions;
      const offset = (inner.offsetWidth - gap.x - length) * 0.3;
      const x = MapNodes.x1x2(nextLevel)[0] - gap.x - offset;
      inner.scrollTo(x, 0);
    }
  }

  if (scrollToY) {
    const station = document.querySelector(`.js-level-${nextLevel}`) as HTMLDivElement;
    if (station) {
      const selector = showMap ? '.js-map' : '.js-holdings';
      const element = document.querySelector(selector) as HTMLDivElement;
      const y = station.offsetTop - element.offsetHeight;
      window.scrollTo(0, y);
    }
  }
}

export default scrollToLevel;