/**
 * Generate a unique key for any set of event options
 */
export function eventOptionsKey(
  normalizedEventOptions: boolean | AddEventListenerOptions
) {
  if (!normalizedEventOptions) {
    return 0;
  }

  // If the browser does not support passive event listeners, the normalized
  // event options will be a boolean.
  if (normalizedEventOptions === true) {
    return 0b0001;
  }

  // At this point, the browser supports passive event listeners, so we expect
  // the event options to be an object with possible properties of capture,
  // passive, and once.
  //
  // We want to consistently return the same value, regardless of the order of
  // these properties, so let's use binary maths to assign each property to a
  // bit, and then add those together (with an offset to account for the
  // booleans at the beginning of this function).
  const capture = normalizedEventOptions.capture ? 0b0010 : 0;
  const passive = normalizedEventOptions.passive ? 0b0100 : 0;
  const once = normalizedEventOptions.once ? 0b1000 : 0;
  return capture | passive | once;
}
