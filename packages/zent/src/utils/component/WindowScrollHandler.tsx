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
 * `onScroll` is throttled to run only once in a frame, you don't have to throttle your callback.
 *
 * `scroll` event on element does not bubble, but the `scroll` event on document does.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event
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
