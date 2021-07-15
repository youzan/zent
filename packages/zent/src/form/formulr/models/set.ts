import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { BasicModel } from './basic';
import { IMaybeError, ValidateOption } from '../validate';
import { Maybe, None, Some } from '../maybe';
import { IModel } from './base';
import isNil from '../../../utils/isNil';
import uniqueId from '../../../utils/uniqueId';
import isPlainObject from '../../../utils/isPlainObject';
import type {
  UnknownFieldSetBuilderChildren,
  UnknownFieldSetModelChildren,
} from '../utils';
import omit from '../../../utils/omit';
import { warningSubscribeValid, warningSubscribeValue } from '../warnings';
import { isModel, SET_ID } from './is';
import type { FieldSetBuilder } from '../builders/set';
import { createSentinelSubject } from './sentinel-subject';
import { hasOwnProperty } from '../../../utils/hasOwn';

type $FieldSetValue<Children extends UnknownFieldSetModelChildren> = {
  [Key in keyof Children]: Children[Key] extends IModel<infer V> ? V : never;
};

class FieldSetModel<
  Children extends UnknownFieldSetModelChildren = UnknownFieldSetModelChildren
> extends BasicModel<$FieldSetValue<Children>> {
  /**
   * @internal
   */
  [SET_ID]!: boolean;

  protected readonly _displayName: string = 'FieldSetModel';

  /**
   * 上层调用 `patchValue` 的时候，子组件可能是没被挂载的状态，这时候需要用 `patchedValue` 存一下值，子组件挂载的时候从这里读
   * @internal
   */
  patchedValue: Partial<$FieldSetValue<Children>> | null = null;

  readonly childRegister$ = new Subject<string>();

  readonly childRemove$ = new Subject<string>();

  readonly children: Children = {} as Children;

  owner: IModel<any> | null = null;

  /**
   * 当前 `FieldSetModel` 对象的 builder 对象，仅在 `Model` 模式下可用。
   */
  readonly builder?: FieldSetBuilder<UnknownFieldSetBuilderChildren>;

  private _valid$?: BehaviorSubject<boolean>;

  private _value$?: BehaviorSubject<$FieldSetValue<Children>>;

  private readonly invalidModels: Set<BasicModel<unknown>> = new Set();

  private readonly mapModelToSubscriptions: Map<
    BasicModel<unknown>,
    Subscription[]
  > = new Map();

  /** @internal */
  constructor(children: Children, id = uniqueId('field-set-')) {
    super(id);
    const keys = Object.keys(children);
    const keysLength = keys.length;
    for (let index = 0; index < keysLength; index++) {
      const name = keys[index];
      const child = children[name];
      this.registerChild(name, child);
    }
    this.children = children;
  }

  get value() {
    if (this._value$) {
      return this._value$.value;
    }
    return this.getRawValue();
  }

  get value$() {
    return this._getValue$(true);
  }

  get valid$() {
    return this._getValid$(true);
  }

  _getValid$(shouldWarn = false) {
    warningSubscribeValid(shouldWarn, this._displayName);

    if (!this._valid$) {
      this._initValid$();
    }

    return this._valid$;
  }

  _getValue$(shouldWarn = false) {
    warningSubscribeValue(shouldWarn, this._displayName);

    if (!this._value$) {
      this._initValue$();
    }

    return this._value$;
  }

  /**
   * 初始化 `FieldSet` 的值，并设置 `initialValue`
   * @param values 待初始化的值
   */
  initialize(values: $FieldSetValue<Children>) {
    if (!isPlainObject(values)) {
      return;
    }
    this.initialValue = Some(values);
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const child = this.children[key] as BasicModel<unknown>;
      if (isModel(child)) {
        child.initialize(values[key]);
      }
    }
  }

  /**
   * @internal
   */
  getPatchedValue<T>(name: string): Maybe<T> {
    if (this.patchedValue && name in this.patchedValue) {
      return Some<T>(this.patchedValue[name] as T);
    }
    return None();
  }

  /**
   * 获取 `FieldSet` 的值
   */
  getRawValue(): $FieldSetValue<Children> {
    const value: any = {};
    const childrenKeys = Object.keys(this.children);
    for (let i = 0; i < childrenKeys.length; i++) {
      const key = childrenKeys[i];
      const model = this.children[key] as BasicModel<unknown>;
      const childValue = model.getRawValue();
      value[key] = childValue;
    }
    return value;
  }

  /**
   * 获取 `FieldSet` 用于表单提交的值
   */
  getSubmitValue() {
    const value: any = {};
    const childrenKeys = Object.keys(this.children);
    for (let i = 0; i < childrenKeys.length; i++) {
      const key = childrenKeys[i];
      const model = this.children[key] as BasicModel<unknown>;
      const childValue = model.getSubmitValue();
      value[key] = childValue;
    }
    return value;
  }

  /**
   * 在 `FieldSet` 上注册一个新的字段。
   * @param name 字段名
   * @param model 字段对应的 model
   */
  registerChild(name: string, model: BasicModel<any>) {
    const children: UnknownFieldSetModelChildren = this.children;
    const prev = children[name];

    if (prev === model) {
      return;
    }

    if (prev) {
      this.removeChild(name);
    }
    this._subscribeChild(name, model);
    model.owner = this;
    children[name] = model;
    this.childRegister$.next(name);
  }

  /**
   * 在 `FieldSet` 上删除指定的字段。
   * 返回被删除的 model。
   * @param name 字段名
   */
  removeChild<T extends keyof Children>(name: T): Children[T] | null {
    if (hasOwnProperty(this.children, name)) {
      const model = this.children[name];
      model.owner = null;
      this._unsubscribeChild(model);
      delete this.children[name];
      this.childRemove$.next(name as string);
      return model;
    }
    return null;
  }

  dispose() {
    super.dispose();
    const { children } = this;
    Object.keys(children).forEach(key => {
      const child = children[key];
      this._unsubscribeChild(child);
      child.dispose();
    });

    // Close all subjects and setup sentinels to warn use after free errors
    this._getValue$().complete();
    this._getValid$().complete();
    this.childRegister$.complete();
    this.childRemove$.complete();

    this._valid$ = createSentinelSubject(this._displayName, false);
    this._value$ = createSentinelSubject(
      this._displayName,
      {} as $FieldSetValue<Children>
    );
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this.childRegister$ as Subject<string>) = createSentinelSubject(
      this._displayName,
      ''
    );
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this.childRemove$ as Subject<string>) = createSentinelSubject(
      this._displayName,
      ''
    );
  }

  /**
   * 更新 `FieldSet` 的值
   * @param value 待更新的值
   */
  patchValue(value: Partial<$FieldSetValue<Children>>) {
    if (!isPlainObject(value)) {
      return;
    }
    this.patchedValue = value as $FieldSetValue<Children>;
    const keys = Object.keys(value);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (hasOwnProperty(this.children, key)) {
        this.children[key]?.patchValue(value[key]);
      }
    }
  }

  /**
   * 清除 `FieldSet` 所有字段的值，同时清除 `initialValue`
   */
  clear() {
    const keys = Object.keys(this.children);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this.children[key]?.clear();
    }
  }

  /**
   * 清除 `FieldSet` 所有字段的错误信息
   */
  clearError() {
    this.error$.next(null);

    const children = this.children;
    const keys = Object.keys(children);
    const length = keys.length;
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      children[key]?.clearError();
    }
  }

  /**
   * 重置 `FieldValue` 所有字段的值，如果存在 `initialValue` 就是用初始值，否则使用默认值
   */
  reset() {
    const keys = Object.keys(this.children);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this.children[key]?.reset();
    }
  }

  /**
   * 执行 `FieldSet` 的校验
   * @param option 校验的参数
   */
  validate(
    option = ValidateOption.Default
  ): Promise<IMaybeError<any> | IMaybeError<any>[]> {
    if (option & ValidateOption.IncludeChildrenRecursively) {
      const childOption = option | ValidateOption.StopPropagation;
      return Promise.all<IMaybeError<any>>(
        Object.keys(this.children)
          .map(key => this.children[key].validate(childOption))
          .concat(this.triggerValidate(option))
      );
    }
    return this.triggerValidate(option);
  }

  /**
   * 是否 `FieldSet` 上的所有字段都没有被修改过
   */
  pristine() {
    const keys = Object.keys(this.children);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const child = this.children[key];
      if (!child.pristine()) {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否 `FieldSet` 上有任意字段被修改过
   *
   * `dirty === !pristine`
   */
  dirty() {
    return !this.pristine();
  }

  /**
   * 是否 `FieldSet` 上有任意字段被 touch 过
   *
   */
  touched() {
    const keys = Object.keys(this.children);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const child = this.children[key];
      if (child.touched()) {
        return true;
      }
    }
    return false;
  }

  /**
   * 返回指定字段名对应的 model
   * @param name 字段名
   */
  get<Name extends keyof Children>(
    name: Name
  ): Children[Name] | undefined | null {
    return this.children[name as string] as any;
  }

  private _setValid() {
    this._valid$?.next(isNil(this.error) && !this.invalidModels.size);
  }

  private _initValue$() {
    const value$ = new BehaviorSubject({} as $FieldSetValue<Children>);
    this._value$ = value$;
    for (const [name, model] of Object.entries(this.children)) {
      this._subscribeChild(name, model);
    }

    const { childRegister$, childRemove$ } = this;

    childRegister$.subscribe(name => {
      value$.next({
        ...value$.value,
        [name]: this.children[name].getRawValue(),
      });
    });
    childRemove$.subscribe(name => {
      value$.next(omit(value$.value, [name]) as $FieldSetValue<Children>);
    });
  }

  private _initValid$() {
    const valid$ = new BehaviorSubject(isNil(this.error));
    this._valid$ = valid$;
    const $ = this.error$.subscribe(() => {
      this._setValid();
    });
    this.mapModelToSubscriptions.set(this as BasicModel<unknown>, [$]);
    for (const [name, model] of Object.entries(this.children)) {
      this._subscribeChild(name, model);
    }
  }

  /**
   * Subscribe `valid$` and `value$` of the model
   * @param model
   */
  private _subscribeChild(name: string, model: BasicModel<unknown>) {
    const { invalidModels, _valid$, _value$ } = this;

    if (_valid$) {
      this._subscribeObservable(model, model._getValid$(), valid => {
        if (valid) {
          invalidModels.delete(model);
        } else {
          invalidModels.add(model);
        }

        this._setValid();
      });
    }

    if (_value$) {
      this._subscribeObservable(model, model._getValue$(), childValue => {
        _value$.next({ ..._value$.value, [name]: childValue });
      });
    }
  }

  /**
   * Unsubscribe `valid$` and `value$` of the model
   * @param model
   */
  private _unsubscribeChild(model: BasicModel<unknown>) {
    const subs = this.mapModelToSubscriptions.get(model);
    subs?.forEach(sub => sub.unsubscribe());
    this.mapModelToSubscriptions.delete(model);
    this.invalidModels.delete(model);
    this._setValid();
  }

  /**
   * Subscribe a specified observable of the model
   * @param model as the key for mapping to subscription
   * @param observable
   * @param observer
   */
  private _subscribeObservable<T>(
    model: BasicModel<unknown>,
    observable: Observable<T>,
    observer: (value: T) => void
  ) {
    const { mapModelToSubscriptions } = this;
    const $ = observable.subscribe(observer);
    const subs = mapModelToSubscriptions.get(model);
    if (subs) {
      subs.push($);
    } else {
      mapModelToSubscriptions.set(model, [$]);
    }
  }
}

FieldSetModel.prototype[SET_ID] = true;

export { FieldSetModel, $FieldSetValue };
