import MapNodes from 'utils/classes/MapNodes';
import { TRounds } from 'utils/types/others';
import { TLevel } from 'utils/types/runData';
import { getScrollHeight } from './helpers';

function scrollToLevel(nextLevel: TLevel, showMap: boolean, rounds: TRounds, scrollToY = true) {
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
    const height = getScrollHeight(nextLevel, showMap, rounds);
    if (!height) return;
    window.scrollTo(0, height);
  }
}

export default scrollToLevel;