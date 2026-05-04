import { useState, useEffect } from 'react';

/**
 * Custom hook that listens for a CSS media query match.
 * Returns true when the query matches, false otherwise.
 * Updates on window resize automatically.
 *
 * @param {string} query - CSS media query string, e.g. '(min-width: 768px)'
 * @returns {boolean}
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);

    // Set initial value
    setMatches(mql.matches);

    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    // Fallback for older browsers
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, [query]);

  return matches;
};

export default useMediaQuery;
