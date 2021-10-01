import React from 'react';

import { LG_GRID_BREAKPOINT, MD_GRID_BREAKPOINT } from '@/constants/styling';

export function useMediaQuery(breakpoint: string) {
  const [matches, setMatches] = React.useState<null | boolean>(null);

  React.useEffect(() => {
    const mql = window.matchMedia(`screen and (min-width: ${breakpoint})`);
    setMatches(mql.matches);

    const changeHandler = (evt: MediaQueryListEvent) => setMatches(evt.matches);

    // here I use addListener instead of addEventListener because addEventListener doesn't work in Safari
    // https://github.com/mdn/sprints/issues/858
    mql.addListener(changeHandler);

    return () => mql.removeListener(changeHandler);
  }, [breakpoint]);

  return matches;
}

export function useMediaQueryDesktop() {
  return useMediaQuery(LG_GRID_BREAKPOINT);
}

export function useMediaQueryTablet() {
  return useMediaQuery(MD_GRID_BREAKPOINT);
}
