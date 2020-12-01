import { BehaviorSubject } from 'rxjs';
import { BasicModel } from './basic';
import { Some, None, or, isSome, get } from '../maybe';
import { ValidateOption } from '../validate';
import { id } from '../utils';
import isNil from '../../../utils/isNil';
import uniqueId from '../../../utils/uniqueId';

const FIELD_ID = Symbol('field');

export interface INormalizeBeforeSubmit<A, B> {
  (a: A): B;
}

class FieldModel<Value> extends BasicModel<Value> {
  /**
   * @internal
   */
  [FIELD_ID]!: boolean;

  readonly _value$ = new BehaviorSubject(this.defaultValue);

  readonly _valid$ = new BehaviorSubject(true);

  isTouched = false;

  /**
   * 输入法的 composition 状态
   */
  isCompositing = false;

  /**
   * 用于表单提交前格式化 `Field` 值的回调函数
   */
  normalizeBeforeSubmit: INormalizeBeforeSubmit<Value, any> = id;

  owner: BasicModel<any> | null = null;

  /** @internal */
  constructor(private readonly defaultValue: Value) {
    super(uniqueId('field-'));
  }

  get value$() {
    return this._value$;
  }

  get valid$() {
    return this._valid$;
  }

  /**
   * 重置 `Field` 为初始值，初始值通过 `initialize` 设置；如果初始值不存在就使用默认值
   */
  reset() {
    this.value$.next(or(this.initialValue, () => this.defaultValue));
  }

  /**
   * 清除 `Field` 的初始值，并将当前值设置为默认值
   */
  clear() {
    this.initialValue = None();
    this.value$.next(this.defaultValue);
  }

  /**
   * 设置 `Field` 为指定的值，同时会设置初始值
   * @param value 要设置的值
   */
  initialize(value: Value) {
    this.initialValue = Some(value);
    this.value$.next(value);
  }

  getRawValue() {
    return this.value$.getValue();
  }

  /**
   * 获取用于表单提交的值
   */
  getSubmitValue() {
    const { normalizeBeforeSubmit } = this;
    return normalizeBeforeSubmit(this.value$.getValue());
  }

  /**
   * 执行 `Field` 的校验规则
   * @param option 执行校验规则的参数
   */
  validate(option = ValidateOption.Default) {
    return this.triggerValidate(option).then(maybeError => {
      this.valid$.next(isNil(maybeError));
      return maybeError;
    });
  }

  /**
   * 更新 `Field` 的值
   * @param value 要设置的值
   */
  patchValue(value: Value) {
    this.value$.next(value);
  }

  /**
   * `Field` 的值是否没有改变过，如果存在初始值会和初始值比较，否则和默认值比较
   */
  pristine() {
    const value = this.value$.getValue();
    if (isSome(this.initialValue)) {
      return value === get(this.initialValue);
    }
    return value === this.defaultValue;
  }

  /**
   * `Field` 的值是否改变过，如果存在初始值会和初始值比较，否则和默认值比较
   *
   * `dirty === !pristine`
   */
  dirty() {
    return !this.pristine();
  }

  /**
   * 用户是否操作过 `Field`，一般是在 `blur` 事件后设置，部分 `Field` 没有 `blur` 事件可能会在 `change` 的时候设置这个状态
   */
  touched() {
    return this.isTouched;
  }
}

FieldModel.prototype[FIELD_ID] = true;

function isFieldModel<T>(maybeModel: any): maybeModel is FieldModel<T> {
  return !!(maybeModel && maybeModel[FIELD_ID]);
}

export { FieldModel, isFieldModel };
