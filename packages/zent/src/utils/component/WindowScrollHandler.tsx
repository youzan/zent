import { useCallback, useEffect, useRef } from 'react';

import { WindowEventHandler } from './WindowEventHandler';
import { useRunOnceInNextFrame } from '../nextFrame';

const OPTIONS = {
  passive: true,
};

export interface IWindowScrollHandler {
  onScroll: (event: UIEvent) => void;
  disableThrottle?: boolean;
  options?: AddEventListenerOptions;
}

/**
 * Register a scroll event on Window.
 *
 * `onScroll` is throttled to run only once in a frame, you don't have to throttle you callback.
 */
export const WindowScrollHandler: React.FC<IWindowScrollHandler> = ({
  disableThrottle = false,
  options,
  onScroll: onScrollProp,
}) => {
  const cb = useRef(onScrollProp);
  cb.current = onScrollProp;

  const onScrollCallback = useCallback((evt: UIEvent) => {
    cb.current(evt);
  }, []);

  const onScroll = useRunOnceInNextFrame(onScrollCallback, disableThrottle);

  useEffect(() => {
    return onScroll.cancel;
  }, [onScroll]);

  return (
    <WindowEventHandler
      eventName="scroll"
      listener={onScroll}
      options={{ ...OPTIONS, ...options }}
    />
  );
};
