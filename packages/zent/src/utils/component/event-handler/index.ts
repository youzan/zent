import { useRef, useEffect } from 'react';

import { TargetEventHandlers } from './TargetEventHandlers';
import { normalizeEventOptions } from './normalize-event-options';
import { eventOptionsKey } from './event-option-key';

// This export is only for unit testing
export const targetMap = new WeakMap<EventTarget, TargetEventHandlers>();

export function addEventListener<T extends EventTarget = HTMLElement>(
  target: T,
  eventName: string,
  listener: EventListener,
  options?: AddEventListenerOptions
) {
  if (!targetMap.has(target)) {
    targetMap.set(target, new TargetEventHandlers(target));
  }
  const normalizedEventOptions = normalizeEventOptions(options);
  return targetMap.get(target).add(eventName, listener, normalizedEventOptions);
}

export function useEventHandler<
  E extends Event,
  N extends string,
  T extends EventTarget = HTMLElement
>(
  target: T,
  eventName: N,
  listener: (event: E) => void,
  options?: AddEventListenerOptions
) {
  const callbackRef = useRef(listener);
  callbackRef.current = listener;
  const optionKey = eventOptionsKey(normalizeEventOptions(options));
  useEffect(() => {
    function cb(e: E) {
      callbackRef.current(e);
    }
    return addEventListener(target, eventName, cb, options);
    // Don't check for options directly, it's often a literal object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, eventName, optionKey]);
}

export interface IEventHandlerProps<E, N, T> {
  target: T;
  eventName: N;
  listener: (event: E) => void;
  options?: AddEventListenerOptions;
}

// type EventHandlerComponent<E, N, T> = React.FC<IEventHandlerProps<E, N, T>>;

export const EventHandler = <
  E extends Event,
  N extends string,
  T extends EventTarget = HTMLElement
>({
  target,
  eventName,
  listener,
  options,
}: IEventHandlerProps<E, N, T>) => {
  useEventHandler(target, eventName, listener, options);
  return null;
};
