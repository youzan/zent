import type { UnknownFieldSetModelChildren } from '../utils';
import type { FieldArrayModel } from './array';
import type { IModel } from './base';
import type { BasicModel } from './basic';
import type { FieldModel } from './field';
import type { FormModel } from './form';
import type { ModelRef } from './ref';
import type { FieldSetModel } from './set';

export const FORM_ID = Symbol('form');
export const MODEL_ID = Symbol('model');
export const FIELD_ID = Symbol('field');
export const REF_ID = Symbol('ref');
export const FIELD_ARRAY_ID = Symbol('field-array');
export const SET_ID = Symbol('set');

export function isModel<T>(maybeModel: any): maybeModel is BasicModel<T> {
  return Boolean(maybeModel?.[MODEL_ID]);
}

export function isFieldModel<T>(maybeModel: any): maybeModel is FieldModel<T> {
  return !!(maybeModel && maybeModel[FIELD_ID]);
}

export function isModelRef<T, P extends IModel<any>, M extends IModel<T>>(
  maybeModelRef: any
): maybeModelRef is ModelRef<T, P, M> {
  return !!(maybeModelRef && maybeModelRef[REF_ID]);
}

export function isFieldArrayModel<
  Item,
  Child extends IModel<Item> = IModel<Item>
>(maybeModel: any): maybeModel is FieldArrayModel<Item, Child> {
  return !!(maybeModel && maybeModel[FIELD_ARRAY_ID]);
}

export function isFieldSetModel<Children extends UnknownFieldSetModelChildren>(
  maybeModel: any
): maybeModel is FieldSetModel<Children> {
  return !!(maybeModel && maybeModel[SET_ID]);
}

export function isFormModel<Children extends UnknownFieldSetModelChildren>(
  maybeModel: any
): maybeModel is FormModel<Children> {
  return !!(maybeModel && maybeModel[FORM_ID]);
}
