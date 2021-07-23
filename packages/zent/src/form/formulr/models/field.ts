import { BehaviorSubject } from 'rxjs';
import { BasicModel } from './basic';
import { Some, None, or, isSome, get } from '../maybe';
import { ValidateOption } from '../validate';
import { id } from '../utils';
import isNil from '../../../utils/isNil';
import uniqueId from '../../../utils/uniqueId';
import { FIELD_ID } from './is';
import type { FieldBuilder } from '../builders';
import { createSentinelSubject } from './sentinel-subject';

export interface INormalizeBeforeSubmit<A, B> {
  (a: A): B;
}

class FieldModel<Value> extends BasicModel<Value> {
  /**
   * @internal
   */
  [FIELD_ID]!: boolean;

  protected readonly _displayName = 'FieldModel';

  readonly _value$ = new BehaviorSubject(this.defaultValue);

  readonly _valid$ = new BehaviorSubject(true);

  /**
   * 当前 `FieldModel` 对象的 builder 对象，仅在 `Model` 模式下可用。
   */
  readonly builder?: FieldBuilder<Value>;

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
   * @internal
   *
   * The same as value$, but without warning
   */
  _getValue$() {
    return this._value$;
  }

  /**
   * @internal
   *
   * The same as value$, but without warning
   */
  _getValid$() {
    return this._valid$;
  }

  /**
   * 重置 `Field` 为初始值，初始值通过 `initialize` 设置；如果初始值不存在就使用默认值
   */
  reset() {
    this._getValue$().next(or(this.initialValue, () => this.defaultValue));
  }

  /**
   * 清除 `Field` 的初始值，并将当前值设置为默认值
   */
  clear() {
    this.initialValue = None();
    this._getValue$().next(this.defaultValue);
  }

  clearError() {
    this.error$.next(null);
  }

  /**
   * 设置 `Field` 为指定的值，同时会设置初始值
   * @param value 要设置的值
   */
  initialize(value: Value) {
    this.initialValue = Some(value);
    this._getValue$().next(value);
  }

  getRawValue() {
    return this._getValue$().getValue();
  }

  /**
   * 获取用于表单提交的值
   */
  getSubmitValue() {
    const { normalizeBeforeSubmit } = this;
    return normalizeBeforeSubmit(this._getValue$().getValue());
  }

  /**
   * 执行 `Field` 的校验规则
   * @param option 执行校验规则的参数
   */
  validate(option = ValidateOption.Default) {
    return this.triggerValidate(option).then(maybeError => {
      this._getValid$().next(isNil(maybeError));
      return maybeError;
    });
  }

  /**
   * 更新 `Field` 的值
   * @param value 要设置的值
   */
  patchValue(value: Value) {
    this._getValue$().next(value);
  }

  /**
   * `Field` 的值是否没有改变过，如果存在初始值会和初始值比较，否则和默认值比较
   */
  pristine() {
    const value = this._getValue$().getValue();
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

  dispose() {
    super.dispose();

    // Close all subjects and setup sentinels to warn use after free errors
    this._getValue$().complete();
    this._getValid$().complete();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this._valid$ as BehaviorSubject<boolean>) = createSentinelSubject(
      this._displayName,
      false
    );
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this._value$ as BehaviorSubject<Value>) = createSentinelSubject(
      this._displayName,
      this.defaultValue
    );
  }
}

FieldModel.prototype[FIELD_ID] = true;

export { FieldModel };
