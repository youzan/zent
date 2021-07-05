import Decimal from 'big.js';
import isNil from '../../utils/isNil';
import { ISyncValidator, IMaybeError, IValidator } from './validate';

export interface IWithLength {
  length: number;
}

const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

function isEmptyInputValue(value: any) {
  // we don't check for string here so it also works with arrays
  return isNil(value) || (value as IWithLength).length === 0;
}

export const SYMBOL_REQUIRED = Symbol('required');

export function markForRequired<T>(validator: IValidator<T>) {
  validator.$$id = SYMBOL_REQUIRED;
}

export function isRequiredValidator<T>(validator: IValidator<T>) {
  return validator.$$id === SYMBOL_REQUIRED;
}

/**
 * 限制一个值的最小值
 * @param limit 允许的最小值（包含自身）
 * @param message 错误信息
 */
export function min(limit: number | string, message?: string) {
  return function min(value: number | string): IMaybeError<number | string> {
    if (isEmptyInputValue(value)) {
      return null;
    }
    try {
      const decimal = new Decimal(value);
      if (decimal.lt(limit)) {
        return {
          name: 'min',
          actual: value,
          limit,
          message,
        };
      }
    } catch (error) {
      return {
        name: 'min',
        actual: value,
        limit,
        message,
      };
    }
    return null;
  };
}

/**
 * 限制一个值的最大值
 * @param limit 允许的最大值（包含自身）
 * @param message 错误信息
 */
export function max(limit: number, message?: string) {
  return function max(value: number | string): IMaybeError<number | string> {
    if (isEmptyInputValue(value)) {
      return null;
    }
    try {
      const decimal = new Decimal(value);
      if (decimal.gt(limit)) {
        return {
          name: 'max',
          actual: value,
          limit,
          message,
        };
      }
    } catch (error) {
      return {
        name: 'max',
        actual: value,
        limit,
        message,
      };
    }
    return null;
  };
}

/**
 * 限制一个值不为 `null`/`undefined`，并且长度不为零
 * @param message 错误信息
 */
export function required(message?: string): ISyncValidator<any> {
  function required(input: any): IMaybeError<string> {
    return isEmptyInputValue(input)
      ? {
          name: 'required',
          message,
          actual: input,
        }
      : null;
  }
  required.$$id = SYMBOL_REQUIRED;
  return required;
}

/**
 * 限制一个值必须为 `true`
 * @param message 错误信息
 */
export function requiredTrue(message?: string): ISyncValidator<boolean> {
  function requiredTrue(input: boolean) {
    return input === true
      ? null
      : {
          name: 'requiredTrue',
          message,
          expect: true,
          actual: input,
        };
  }
  return requiredTrue;
}

/**
 * 限制一个值是合法的 email 地址，规则和 Angular 使用的一致
 * @param message 错误信息
 */
export function email(message?: string): ISyncValidator<string> {
  function email(input: string) {
    return EMAIL_REGEXP.test(input)
      ? null
      : {
          name: 'email',
          message,
          actual: input,
        };
  }
  return email;
}

/**
 * 限制一个值的最小长度，通过 `.length` 属性判断
 * @param length 允许的最小长度（包含自身）
 * @param message 错误信息
 */
export function minLength<T extends IWithLength>(
  length: number,
  message?: string
): ISyncValidator<T> {
  function minLength(input: T) {
    return input.length < length
      ? {
          name: 'minLength',
          message,
          actual: input,
          limit: length,
        }
      : null;
  }
  return minLength;
}

/**
 * 限制一个值的最大长度，通过 `.length` 属性判断
 * @param length 允许的最大长度（包含自身）
 * @param message 错误信息
 */
export function maxLength<T extends IWithLength>(
  length: number,
  message?: string
): ISyncValidator<T> {
  function maxLength(input: T) {
    return input.length > length
      ? {
          name: 'maxLength',
          message,
          actual: input,
          limit: length,
        }
      : null;
  }
  return maxLength;
}

/**
 * 限制一个字符串必须匹配一个正则表达式
 * @param regexp 要匹配的正则表达式
 * @param message 错误信息
 */
export function pattern(
  regexp: RegExp,
  message?: string
): ISyncValidator<string> {
  function pattern(input: string) {
    return regexp.test(input)
      ? null
      : {
          name: 'pattern',
          message,
          actual: input,
          pattern: regexp,
        };
  }
  return pattern;
}
