import { scrollToLevel } from 'components/log/control';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TLevel } from './types/runData';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;