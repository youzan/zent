import isBrowser from '../isBrowser';
import { useEventHandler, EventHandler } from './event-handler';

export interface IWindowEventHandlerProps<K extends keyof WindowEventMap> {
  eventName: K;
  listener(ev: WindowEventMap[K]): void;
  options?: AddEventListenerOptions;
}

export function useWindowEventHandler<K extends keyof WindowEventMap>(
  eventName: K,
  listener: (ev: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions
) {
  if (!isBrowser) {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useEventHandler(window, eventName, listener, options);
}

export function WindowEventHandler<K extends keyof WindowEventMap>({
  eventName,
  listener,
  options,
}: IWindowEventHandlerProps<K>) {
  if (!isBrowser) {
    return null;
  }

  return (
    <EventHandler
      target={window}
      eventName={eventName}
      listener={listener}
      options={options}
    />
  );
}

export default WindowEventHandler;
