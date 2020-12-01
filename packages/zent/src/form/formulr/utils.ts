import { useEffect } from 'react';
import { FieldSetModel, BasicModel, ModelRef } from './models';
import { BasicBuilder } from './builders';
import _warning from '../../utils/warning';

export function noop() {
  // noop
}

export function last<T>(arr: T[]) {
  return arr.length ? arr[arr.length - 1] : null;
}

export const id = <T>(it: T) => it;

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

export type $MergeProps<T> = (T extends any ? (t: T) => void : never) extends (
  r: infer R
) => void
  ? R
  : never;

export const { isArray } = Array;

export type UnknownObject = Record<string, unknown>;
export type UnknownFieldSetModelChildren = Record<string, BasicModel<any>>;
export type UnknownFieldSetBuilderChildren = Record<
  string,
  BasicBuilder<any, BasicModel<any>>
>;

const warnings: Record<string, boolean> = {};

export function warning(id: string, message: string) {
  if (!warnings[id]) {
    warnings[id] = true;
    _warning(false, message);
  }
}
