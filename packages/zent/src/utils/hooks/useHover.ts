import { useState, useCallback } from 'react';

export function useHover(initial = false) {
  const [isHover, setIsHover] = useState(initial);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return {
    isHover,
    onMouseEnter,
    onMouseLeave,
  };
}
