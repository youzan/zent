import { BehaviorSubject } from 'rxjs';
import { createModelDisposedError } from '../error';

/**
 * Creates a BehaviorSubject in error state.
 * We use this as a sentinel after a model is disposed.
 *
 * @param name Model type, e.g. FieldModel
 * @param defaultValue Default value for subject
 */
export function createSentinelSubject<T>(name: string, defaultValue: T) {
  const sub = new BehaviorSubject(defaultValue);
  sub.error(createModelDisposedError(name));
  return sub;
}
