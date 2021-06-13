import { useMemo, useState, useEffect } from 'react';
import noop from '../../../utils/noop';
import { IFormContext } from '../context';
import { getFieldSetChildChangeObservable } from './set';

// `ctx` 仅在 `name` 存在时才需要
export function useModelFromContext<Model>(
  ctx: IFormContext | null,
  name: string | undefined,
  model: Model | undefined,
  check: (m: any) => m is Model
): Model | null {
  const { parent } = ctx ?? {};

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

    const $ = getFieldSetChildChangeObservable(parent, name).subscribe(name => {
      const candidate = parent.get(name);
      if (check(candidate)) {
        setModel(candidate);
      }
    });
    return () => $.unsubscribe();
  }, [name, parent, m, check]);
  return maybeModel;
}
