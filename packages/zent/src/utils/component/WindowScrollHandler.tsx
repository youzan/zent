import { useCallback, useEffect, useRef } from 'react';

import { WindowEventHandler } from './WindowEventHandler';
import { runOnceInNextFrame } from '../nextFrame';

const OPTIONS = {
  passive: true,
};

export interface IWindowScrollHandler {
  onScroll: (event: UIEvent) => void;
  options?: AddEventListenerOptions;
}

/**
 * Register a scroll event on Window.
 *
 * `onScroll` is throttled to run only once in a frame, you don't have to throttle you callback.
 */
export const WindowScrollHandler: React.FC<IWindowScrollHandler> = props => {
  const cb = useRef(props.onScroll);
  cb.current = props.onScroll;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = useCallback(
    runOnceInNextFrame((evt: UIEvent) => {
      cb.current(evt);
    }),
    []
  );

  useEffect(() => {
    return onScroll.cancel;
  }, [onScroll]);

  return (
    <WindowEventHandler
      eventName="scroll"
      listener={onScroll}
      options={{ ...OPTIONS, ...props.options }}
    />
  );
};
