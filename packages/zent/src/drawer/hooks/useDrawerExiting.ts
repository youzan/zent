import { useState, useCallback } from 'react';

export const useDrawerExiting = (visible: boolean) => {
  const [exiting, setExiting] = useState(false);
  const [prevVisible, setPrevVisible] = useState(visible);

  const onExited = useCallback(() => {
    setExiting(false);
  }, []);

  if (prevVisible === visible) {
    return { exiting, onExited };
  }

  setExiting(!visible);
  setPrevVisible(visible);

  return { exiting, onExited };
};
