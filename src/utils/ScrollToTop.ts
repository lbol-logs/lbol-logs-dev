import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.size) window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}

export default ScrollToTop;