import * as React from 'react';

export function useHover(initial = false) {
  const [isHover, setIsHover] = React.useState(initial);

  const onMouseEnter = React.useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = React.useCallback(() => {
    setIsHover(false);
  }, []);

  return {
    isHover,
    onMouseEnter,
    onMouseLeave,
  };
}
