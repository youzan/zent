import * as React from 'react';
import { Observable } from 'rxjs';
import { IVerifyOption, Validator } from 'formulr';
import { IFormContext } from './context';
import isPromise from '../utils/isPromise';
import scroll from '../utils/scroll';

export function scrollToNode(el: Element) {
  if (typeof el.getBoundingClientRect !== 'function') {
    return;
  }
  const elementBound = el.getBoundingClientRect();
  const y = elementBound.top + window.pageYOffset;
  const x = elementBound.left + window.pageXOffset;
  scroll(document.body, x, y);
}

export const ASYNC = Symbol('async');

interface IState {
  [key: string]: unknown | Promise<unknown>;
  [ASYNC]?: AsyncValidation<unknown>;
}

export interface Dictionary<T = unknown> {
  [key: string]: T;
}

export type AsyncValidation<T> = (value: T) => Promise<any>;

export interface Validations<T> {
  [key: string]:
    | boolean
    | ((values: { [key: string]: unknown }, value: T, extra?: unknown) => boolean)
    | AsyncValidation<T>;
}

export interface IValidationProps<T> {
  validations?: Validations<T>;
  validationErrors?: {
    [key: string]: React.ReactNode;
  };
  asyncValidation?: (values: unknown, value: T) => Promise<unknown>;
}

export interface IFormCommonProps<T> extends IValidationProps<T> {
  name: string;
  defaultValue?: T;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  relatedFields?: string[];
  onBlur?: (e: unknown) => void;
  onFocus?: (e: unknown) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const validate = <T>(
  g: Validations<T>,
  local: Validations<T>,
  value: T
) => {
  const state: IState = {};
  const pending = new Set<Promise<unknown>>();
  return new Observable(observer => {
    const then = (key: string | symbol, promise: Promise<unknown> | null) => (
      err: unknown
    ) => {
      state[key as any] = err;
      promise && pending.delete(promise);
      observer.next(state);
      if (pending.size === 0) {
        observer.complete();
      }
    };
    const call = (
      key: string | symbol,
      validator: (values: unknown, a: T, extra: unknown) => unknown,
      extra: unknown
    ) => {
      const e = validator({}, value, extra) || false;
      if (isPromise(e)) {
        state[key as any] = e;
        pending.add(e);
        e.then(then(key, e), (err: unknown) => {
          observer.error(err);
        });
      } else {
        then(key, null)(e);
      }
    };
    for (const key of Object.keys(local)) {
      const validation = local[key];
      if (typeof validation === 'function') {
        call(key, validation, validation);
      } else if (validation) {
        const vf = g[key];
        if (typeof vf !== 'function') {
          observer.error(new Error(`Validation '${key}' not found`));
          return;
        }
        call(key, vf, validation);
      }
    }
    const asyncValidation = local[ASYNC as any];
    if (asyncValidation) {
      call(ASYNC, asyncValidation as AsyncValidation<unknown>, asyncValidation);
    }
  });
};

export interface IWithFormContext {
  context: IFormContext;
}

export function makeValidator<T>(
  comp: { props: IValidationProps<T> } & IWithFormContext
): Validator<T> {
  return (value: T, verifyOption: IVerifyOption) => {
    const { validations, asyncValidation } = comp.props;
    const v: Validations<T> = {};
    Object.assign(v, validations || {});
    switch (verifyOption.source) {
      case 'change':
      case 'submit':
      case 'focus':
        break;
      default:
        Object.assign(v, {
          [ASYNC]: asyncValidation,
        });
        break;
    }
    return validate(comp.context.validations || {}, v, value);
  };
}

export function ensureContext(comp: IWithFormContext): IFormContext {
  if (!comp.context) {
    throw new Error(
      `${comp.constructor.name} must be child of a 'Form' component`
    );
  }
  return comp.context;
}

export function hasError(errors: { [key: string]: unknown } | null) {
  if (!errors) {
    return false;
  }
  for (const value of Object.values(errors)) {
    if (value !== null && value !== undefined && !value) {
      return true;
    }
  }
  return false;
}

export function shouldShowError(errors: { [key: string]: Promise<any> | boolean } | null | undefined) {
  if (!errors) {
    return false;
  }
  for (const error of Object.values(errors)) {
    if (!error) {
      return true;
    }
  }
  if (errors[ASYNC as any]) {
    return true;
  }
  return false;
}
