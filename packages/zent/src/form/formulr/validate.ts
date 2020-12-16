import { Observable, from, NextObserver, of, defer, EMPTY } from 'rxjs';
import { catchError, map, concatAll, filter, takeWhile } from 'rxjs/operators';
import { BasicModel, isFieldSetModel } from './models';
import { finalizeWithLast } from './finalize-with-last';
import isNil from '../../utils/isNil';
import { UnknownObject } from './utils';

export const ASYNC_VALIDATOR = Symbol('AsyncValidator');

export interface IAsyncValidator<T> {
  [ASYNC_VALIDATOR]: true;
  validator(
    input: T,
    ctx: ValidatorContext<T>
  ): null | Observable<IMaybeError<T>> | Promise<IMaybeError<T>>;
  $$id?: any;
}

export interface ISyncValidator<T> {
  (input: T, ctx: ValidatorContext<T>): IMaybeError<T>;
  $$id?: any;
}

export type IValidator<T> = IAsyncValidator<T> | ISyncValidator<T>;

export type IValidators<T> = readonly IValidator<T>[];

/**
 * 判断一个校验函数是否是异步的，异步的校验函数必须使用 `createAsyncValidator` 创建
 * @param validator 校验函数
 */
export function isAsyncValidator<T>(
  validator: ISyncValidator<T> | IAsyncValidator<T>
): validator is IAsyncValidator<T> {
  if ((validator as ISyncValidator<T> & IAsyncValidator<T>)[ASYNC_VALIDATOR]) {
    return true;
  }
  return false;
}

/**
 * 创建一个异步校验函数
 * @param validator 异步校验函数的实现
 */
export function createAsyncValidator<T>(
  validator: (
    value: T,
    context: ValidatorContext<T>
  ) => null | Observable<IMaybeError<T>> | Promise<IMaybeError<T>>
): IAsyncValidator<T> {
  return {
    [ASYNC_VALIDATOR]: true,
    validator,
  };
}

/**
 * 校验结果错误名
 */
export interface IValidateResult<T> {
  /**
   * 校验结果对应的字段名
   */
  name: string;
  /**
   * 校验的错误信息
   */
  message?: string;
  /**
   * 校验时的期望值，一般用于自定义复杂的上下文相关的错误信息
   */
  expect?: T;
  /**
   * 校验时的实际值，一般用于自定义复杂的上下文相关的错误信息
   */
  actual?: T;
  [key: string]: any;
}

export type IMaybeError<T> = IValidateResult<T> | null | undefined;

// prettier-ignore
export enum ValidateOption {
  /**
   * 默认行为
   */
  Empty                         = 0b000000000,
  /**
   * 校验时包含异步校验
   */
  IncludeAsync                  = 0b000000010,
  /**
   * 校验时包含没有 `touch` 过的字段
   */
  IncludeUntouched              = 0b000000100,
  /**
   * 递归校验下层的 `Field`，适用于直接从 `FieldSet` 和 `FieldArray` 触发的校验
   */
  IncludeChildrenRecursively    = 0b000001000,
  /**
   * 不校验没有修改过的 `Field`
   */
  ExcludePristine               = 0b000010000,
  StopPropagation               = 0b000100000,

  Default                       = Empty,
}

export interface IValidation {
  option: ValidateOption;
  resolve(error?: IMaybeError<any>): void;
  reject(error?: any): void;
}

export class ErrorSubscriber<T> implements NextObserver<IMaybeError<T>> {
  constructor(private readonly model: BasicModel<T>) {}

  next(error: IMaybeError<T>) {
    this.model.error = error;
  }
}

/**
 * 表单校验函数的上下文信息
 */
export class ValidatorContext<T> {
  constructor(readonly model: BasicModel<T>) {}

  getSection(): BasicModel<T>['owner'] {
    return this.model.owner;
  }

  getSectionValue<T>(...names: string[]): T | null {
    if (!this.model.owner || !isFieldSetModel(this.model.owner)) {
      return null;
    }
    if (names.length === 0) {
      return this.model.owner.getRawValue() as T;
    }
    const data: UnknownObject = {};
    for (let i = 0; i < names.length; i += 1) {
      const name = names[i];
      const model = this.model.owner.get(name);
      if (model) {
        data[name] = model.getRawValue();
      }
    }
    return data as T;
  }

  getFormValue<T>(): T | null | undefined {
    return this.model.form?.getRawValue() as T | null | undefined;
  }
}

function runValidator<T>(
  validator: IAsyncValidator<T> | ISyncValidator<T>,
  { reject }: IValidation,
  value: T,
  ctx: ValidatorContext<T>
): Observable<IMaybeError<T>> {
  try {
    if (isAsyncValidator(validator)) {
      const ret = validator.validator(value, ctx);
      if (ret === null) {
        return of(null);
      }
      return from(ret);
    } else {
      return of(validator(value, ctx));
    }
  } catch (error) {
    reject(error);
    return EMPTY;
  }
}

class ValidatorExecutor<T> {
  readonly ctx: ValidatorContext<T>;

  constructor(private readonly model: BasicModel<T>) {
    this.ctx = new ValidatorContext(model);
  }

  call(validation: IValidation): Observable<IMaybeError<T>> {
    const { option, reject, resolve } = validation;
    if (!this.model.touched() && !(option & ValidateOption.IncludeUntouched)) {
      resolve();
      return of(null);
    }
    if (option & ValidateOption.ExcludePristine && this.model.pristine()) {
      resolve();
      return of(null);
    }
    const value = this.model.getRawValue();
    const skipAsync = (option & ValidateOption.IncludeAsync) === 0;
    return from(this.model.validators).pipe(
      filter(validator => (skipAsync ? !isAsyncValidator(validator) : true)),
      map(validator =>
        defer(() => runValidator(validator, validation, value, this.ctx))
      ),
      concatAll(),
      takeWhile(isNil, true),
      catchError(error => {
        reject(error);
        return EMPTY;
      }),
      finalizeWithLast<IMaybeError<T>>(resolve, null)
    );
  }
}

/**
 * 执行 `model` 上的校验规则对 `model` 校验
 * @param model 要校验的 model 对象
 */
export function validate<T>(model: BasicModel<T>) {
  const executor = new ValidatorExecutor(model);
  return (validation: IValidation) => executor.call(validation);
}
