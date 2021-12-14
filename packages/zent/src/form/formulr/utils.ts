import { useEffect } from 'react';
import { FieldSetModel, BasicModel, ModelRef } from './models';
import { BasicBuilder } from './builders';

export function noop() {}

export function last<T>(arr: T[]) {
  return arr.length ? arr[arr.length - 1] : null;
}

export function useDestroyOnUnmount<Model extends BasicModel<any>>(
  field: string | BasicModel<any> | ModelRef<any, any, Model>,
  model: BasicModel<any>,
  parent: FieldSetModel | undefined
) {
  useEffect(
    () => () => {
      if (typeof field === 'string' && model.destroyOnUnmount) {
        parent.removeChild(field);
        // model is unusable after this
        model.dispose();
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
