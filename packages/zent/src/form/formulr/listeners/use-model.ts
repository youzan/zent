import { useMemo, useState, useEffect } from 'react';
import { merge, asapScheduler } from 'rxjs';
import { observeOn, filter } from 'rxjs/operators';
import noop from '../../../utils/noop';
import { IFormContext } from '../context';

export function useModelFromContext<Model>(
  ctx: IFormContext,
  name: string | undefined,
  model: Model | undefined,
  check: (m: any) => m is Model
): Model | null {
  const { parent } = ctx;
  const m = useMemo(() => {
    if (typeof name === 'string') {
      const m = parent.get(name);
      if (check(m)) {
        return m;
      }
    }
    if (check(model)) {
      return model;
    }
    return null;
  }, [name, model, check, parent]);
  const [maybeModel, setModel] = useState(m);
  useEffect(() => {
    if (!name) {
      return noop;
    }
    const m = parent.get(name);
    check(m) && setModel(m);

    /**
     * Because `FieldSetModel.prototype.registerChild` will be
     * called inside `useMemo`, consume at next micro task queue
     * to avoid react warning below.
     *
     * Cannot update a component from inside the function body
     * of a different component.
     */
    const $ = merge(parent.childRegister$, parent.childRemove$)
      .pipe(
        observeOn(asapScheduler),
        filter(change => change === name)
      )
      .subscribe(name => {
        const candidate = parent.get(name);
        if (check(candidate)) {
          setModel(candidate);
        }
      });
    return () => $.unsubscribe();
  }, [name, parent, m, check]);
  return maybeModel;
}
