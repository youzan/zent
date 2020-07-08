import { useEffect } from 'react';
import { FieldSetModel, BasicModel, ModelRef } from './models';

export function noop() {
  // noop
}

export function last<T>(arr: T[]) {
  return arr.length ? arr[arr.length - 1] : null;
}

export const id = <T>(it: T) => it;

export function isPlainObject(value: unknown): value is object {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

export function useDestroyOnUnmount<Model extends BasicModel<any>>(
  field: string | BasicModel<any> | ModelRef<any, any, Model>,
  model: BasicModel<any>,
  parent: FieldSetModel
) {
  useEffect(
    () => () => {
      if (typeof field === 'string' && model.destroyOnUnmount) {
        parent.removeChild(field);
      }
    },
    [field, model, parent]
  );
}

export type $MergeProps<T> = (T extends any
? (t: T) => void
: never) extends (r: infer R) => void
  ? R
  : never;

export const { isArray } = Array;
