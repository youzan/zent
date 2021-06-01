import { asapScheduler, merge } from 'rxjs';
import { filter, observeOn } from 'rxjs/operators';
import type { FieldSetModel } from '../models/set';

/**
 * Because `FieldSetModel.prototype.registerChild` will be
 * called inside `useMemo`, consume at next micro task queue
 * to avoid react warning below.
 *
 * Cannot update a component from inside the function body
 * of a different component.
 */
export function getFieldSetChildChangeObservable(
  fieldSet: FieldSetModel,
  name: string
) {
  const $ = merge(fieldSet.childRegister$, fieldSet.childRemove$).pipe(
    observeOn(asapScheduler),
    filter(change => change === name)
  );
  return $;
}
