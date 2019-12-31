import * as React from 'react';
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
  return useEventHandler(window, eventName, listener, options);
}

export function WindowEventHandler<K extends keyof WindowEventMap>({
  eventName,
  listener,
  options,
}: IWindowEventHandlerProps<K>) {
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
