import { canUsePassiveEventListeners } from './supports-passive';

export function normalizeEventOptions(
  eventOptions?: AddEventListenerOptions
): boolean | AddEventListenerOptions {
  if (!eventOptions) {
    return false;
  }

  if (!canUsePassiveEventListeners()) {
    // If the browser does not support the passive option, then it is expecting
    // a boolean for the options argument to specify whether it should use
    // capture or not. In more modern browsers, this is passed via the `capture`
    // option, so let's just hoist that value up.
    return !!eventOptions.capture;
  }

  return eventOptions;
}
