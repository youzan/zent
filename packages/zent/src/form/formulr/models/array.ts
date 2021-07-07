import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BasicModel } from './basic';
import { ValidateOption } from '../validate';
import { ModelRef } from './ref';
import type { BasicBuilder } from '../builders/basic';
import { get, or, Some } from '../maybe';
import { IModel } from './base';
import isNil from '../../../utils/isNil';
import uniqueId from '../../../utils/uniqueId';
import { pairwise, skip } from 'rxjs/operators';
import { createUnexpectedModelError } from '../error';
import { warningSubscribeValid, warningSubscribeValue } from '../warnings';
import { FIELD_ARRAY_ID, isModelRef, isModel } from './is';
import type { FieldArrayBuilder } from '../builders';
import { createSentinelSubject } from './sentinel-subject';

class FieldArrayModel<
  Item,
  Child extends IModel<Item> = IModel<Item>
> extends BasicModel<readonly Item[]> {
  /**
   * @internal
   */
  [FIELD_ARRAY_ID]!: boolean;

  protected readonly _displayName = 'FieldArrayModel';

  readonly children$: BehaviorSubject<Child[]>;

  owner: IModel<any> | null = null;

  /**
   * 当前 `FieldArrayModel` 对象的 builder 对象，仅在 `Model` 模式下可用。
   */
  readonly builder?: FieldArrayBuilder<BasicBuilder<Item, Child>>;

  private _valid$?: BehaviorSubject<boolean>;

  private _value$?: BehaviorSubject<readonly Item[]>;

  private readonly invalidModels: Set<BasicModel<Item>> = new Set();

  private readonly mapModelToSubscriptions: Map<IModel<any>, Subscription[]> =
    new Map();

  private readonly childFactory: (defaultValue: Item) => Child;

  /** @internal */
  constructor(
    childBuilder: BasicBuilder<Item, Child> | null,
    private readonly defaultValue: readonly Item[]
  ) {
    super(uniqueId('field-array-'));
    this.childFactory = childBuilder
      ? (defaultValue: Item) => {
          const child = childBuilder.build(Some(defaultValue));
          return this._linkChild(child);
        }
      : (defaultValue: Item) =>
          new ModelRef<Item, FieldArrayModel<Item, Child>, Child>(
            null,
            Some(defaultValue),
            this
          ) as unknown as Child;
    const children = this.defaultValue.map(this._buildChild);
    this.children$ = new BehaviorSubject(children);
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

  /**
   * @internal
   *
   * The same as value$, but without warning
   */
  _getValue$(shouldWarn = false) {
    warningSubscribeValue(shouldWarn, this._displayName);

    if (!this._value$) {
      this._initValue$();
    }

    return this._value$;
  }

  _getValid$(shouldWarn = false) {
    warningSubscribeValid(shouldWarn, this._displayName);

    if (!this._valid$) {
      this._initValid$();
    }

    return this._valid$;
  }

  /**
   * 重置 `FieldArray` 为初始值，初始值通过 `initialize` 设置；如果初始值不存在就使用默认值
   */
  reset() {
    const children = or(this.initialValue, () => this.defaultValue).map(
      this._buildChild
    );
    this.children$.next(children);
  }

  /**
   * 清除 `FieldArray` 的初始值，并将当前值设置为默认值
   */
  clear() {
    this.initialValue = undefined;
    const children = this.defaultValue.map(this._buildChild);
    this.children$.next(children);
  }

  /**
   * 清除 `FieldArray` 所有字段的错误信息
   */
  clearError() {
    this.error$.next(null);

    const children = this.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      const element = children[i];
      element.clearError();
    }
  }

  /**
   * 获取 `FieldArray` 内的所有 model
   */
  get children(): ReadonlyArray<Child> {
    return this.children$.getValue();
  }

  /**
   * 获取指定下标的子 model
   * @param index child model index
   */
  get(index: number): Child {
    return this.children[index];
  }

  /**
   * 获取 `FieldArray` 内的原始值
   */
  getRawValue() {
    return this._getValue(model => model.getRawValue());
  }

  /**
   * 获取 `FieldArray` 的用于表单提交的值，和原始值可能不一致
   */
  getSubmitValue() {
    return this._getValue(model => model.getSubmitValue());
  }

  /**
   * 修改 `FieldArray` 的值
   * @param value 要修改的值
   */
  patchValue(value: Item[]) {
    const children = this.children$.getValue();
    for (let i = 0; i < value.length; i += 1) {
      if (i >= children.length) {
        break;
      }
      const item = value[i];
      const model = children[i];
      if (isModelRef(model)) {
        const m = model.getModel();
        m && m.patchValue(item);
      } else if (isModel(model)) {
        model.patchValue(item);
      }
    }
    if (value.length <= children.length) {
      this.splice(value.length, children.length - value.length);
      return;
    }
    for (let i = children.length; i < value.length; i += 1) {
      const item = value[i];
      this.push(item);
    }
  }

  /**
   * 初始化 `FieldArray` 的值，同时设置 `initialValue`
   * @param values 要设置为初始化值的值
   */
  initialize(values: Item[]) {
    this.initialValue = Some(values);
    const children = values.map(this._buildChild);
    this.children$.next(children);
  }

  /**
   * 添加一批元素到 `FieldArray` 的末尾
   * @param models 待添加的 `Model` 对象
   */
  push(...models: Child[]): number;
  /**
   * 添加一批元素到 `FieldArray` 的末尾
   * @param values 待添加的值
   */
  push(...values: Item[]): number;
  push(...items: Item[] | Child[]) {
    const nextChildren = this.children$
      .getValue()
      .concat(
        (items.map as any)((item: Item | Child) =>
          isModel(item)
            ? this._linkChild(item as Child)
            : this._buildChild(item as Item)
        )
      );
    this.children$.next(nextChildren);

    // Same as `Array.prototype.push`
    return nextChildren.length;
  }

  /**
   * 删除 `FieldArray` 最后的一个元素。
   * @return `Model` 对象，而不是 `Model` 对象上的值。
   */
  pop() {
    const children = this.children$.getValue().slice();
    const child = children.pop();
    child && this._disposeChild(child);
    this.children$.next(children);
    return child;
  }

  /**
   * 删除 `FieldArray` 第一个元素
   * @return `Model` 对象，而不是 `Model` 对象上的值。
   */
  shift() {
    const children = this.children$.getValue().slice();
    const child = children.shift();
    child && this._disposeChild(child);
    this.children$.next(children);
    return child;
  }

  /**
   * 在 `FieldArray` 开头添加值
   * @param models 待添加的 `Model` 对象
   */
  unshift(...models: Child[]): number;
  /**
   * 在 `FieldArray` 开头添加值
   * @param values 待添加的值
   */
  unshift(...values: Item[]): number;
  unshift(...items: Item[] | Child[]) {
    const nextChildren = (items.map as any)((item: Item | Child) =>
      isModel(item)
        ? this._linkChild(item as Child)
        : this._buildChild(item as Item)
    ).concat(this.children$.getValue());
    this.children$.next(nextChildren);
    return nextChildren.length;
  }

  /**
   * 在 `FieldArray` 的指定位置删除指定数量的元素，并添加指定的新元素
   * @param start 开始删除的元素位置
   * @param deleteCount 删除的元素个数
   * @param models 待添加的 `Model`
   * @return `Model` 对象，而不是 `Model` 对象上的值
   */
  splice(
    start: number,
    deleteCount: number,
    ...models: readonly Child[]
  ): Child[];
  /**
   * 在 `FieldArray` 的指定位置删除指定数量的元素，并添加指定的新元素
   * @param start 开始删除的元素位置
   * @param deleteCount 删除的元素个数
   * @param values 待添加的元素值
   * @return `Model` 对象，而不是 `Model` 对象上的值
   */
  splice(
    start: number,
    deleteCount: number,
    ...values: readonly Item[]
  ): Child[];
  splice(
    start: number,
    deleteCount = 0,
    ...items: readonly Item[] | readonly Child[]
  ): Child[] {
    const children = this.children$.getValue().slice();
    const insertedChildren = (items.map as any)((item: Item | Child) => {
      isModel(item)
        ? this._linkChild(item as Child)
        : this._buildChild(item as Item);
    });
    const removedChildren = children.splice(
      start,
      deleteCount,
      ...insertedChildren
    );
    removedChildren.forEach(this._disposeChild);
    this.children$.next(children);
    return removedChildren;
  }

  /**
   * 执行 `FieldArray` 的校验
   * @param option 校验的参数
   */
  validate(option = ValidateOption.Default): Promise<any> {
    if (option & ValidateOption.IncludeChildrenRecursively) {
      const childOption = option | ValidateOption.StopPropagation;
      return Promise.all(
        this.children$
          .getValue()
          .map(it => it.validate(childOption))
          .concat(this.triggerValidate(option))
      );
    }
    return this.triggerValidate(option);
  }

  /**
   * 是否 `FieldArray` 所有元素都没有修改过
   */
  pristine() {
    const children = this.children$.getValue();
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.dirty()) {
        return false;
      }
    }
    return true;
  }

  /**
   * 是否 `FieldArray` 中任意元素有过修改
   *
   * `dirty === !pristine`
   */
  dirty() {
    return !this.pristine();
  }

  /**
   * 是否 `FieldArray` 任意元素被 touch 过
   */
  touched() {
    const children = this.children$.getValue();
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.touched()) {
        return true;
      }
    }
    return false;
  }

  dispose() {
    super.dispose();
    this.children.forEach(child => {
      this._unsubscribeChild(child);
      child.dispose();
    });
    this.children$.next([]);

    // Close all subjects and setup sentinels to warn use after free errors
    this._getValue$().complete();
    this._getValid$().complete();
    this.children$.complete();
    this._valid$ = createSentinelSubject(this._displayName, false);
    this._value$ = createSentinelSubject(this._displayName, []);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this.children$ as BehaviorSubject<Child[]>) = createSentinelSubject(
      this._displayName,
      []
    );
  }

  private _linkChild(child: Child) {
    child.owner = this;
    return child;
  }

  private _initValue$() {
    const value$ = new BehaviorSubject<readonly Item[]>(this.getRawValue());
    this._value$ = value$;

    /** Skip the first subscription to avoid setting initialValue repeatedly */
    this.children$.pipe(skip(1)).subscribe(() => {
      value$.next(this.getRawValue());
    });

    for (const child of this.children) {
      this._subscribeChild(child);
    }

    /** Do it if there's no initialized observable  */
    if (!this._valid$) {
      this._initUnsubscribeChild();
    }
  }

  private _initValid$() {
    const valid$ = new BehaviorSubject(isNil(this.error));
    this._valid$ = valid$;

    const $ = this.error$.subscribe(maybeError => {
      const selfValid = isNil(maybeError);
      valid$.next(selfValid && !this.invalidModels.size);
    });
    this.mapModelToSubscriptions.set(this, [$]);

    /** Skip the first subscription to avoid setting initialValue repeatedly */
    this.children$.pipe(skip(1)).subscribe(() => {
      /** Emit valid$ when children removed */
      valid$.next(isNil(this.error) && !this.invalidModels.size);
    });

    for (const child of this.children) {
      this._subscribeChild(child);
    }

    /** Do it if there's no initialized observable  */
    if (!this._value$) {
      this._initUnsubscribeChild();
    }
  }

  /**
   * Subscribe `children$` to unsubscribe the removed child
   */
  private _initUnsubscribeChild() {
    this.children$.pipe(pairwise()).subscribe(([prev, current]) => {
      for (const child of prev) {
        if (!current.includes(child)) {
          this._unsubscribeChild(child);
        }
      }
    });
  }

  /**
   * Base method for getting value from array model
   * @param getter map model to value
   */
  private _getValue<V>(getter: (model: BasicModel<Item>) => V): V[] {
    return this.children$.getValue().map(child => {
      if (isModelRef<Item, this, BasicModel<Item>>(child)) {
        const model = child.getModel();
        return isModel<Item>(model)
          ? getter(model)
          : (get(child.initialValue) as unknown as V);
      } else if (isModel<Item>(child)) {
        return getter(child);
      }
      throw createUnexpectedModelError(child);
    });
  }

  /**
   * Handle different types of the child
   * @param model
   */
  private _subscribeChild(child: Child) {
    const { _valid$, _value$, mapModelToSubscriptions } = this;
    if (_valid$ || _value$) {
      if (isModelRef<Item, FieldArrayModel<Item, Child>, Child>(child)) {
        /** Subscribe current model immediately */
        const model = child.getModel();
        if (isModel<Item>(model)) {
          this._subscribeChildModel(model);
        }

        /** Replace subscription while model updated */
        const $ = child.model$.pipe(pairwise()).subscribe(([prev, current]) => {
          prev && this._unsubscribeChild(prev);

          if (isModel<Item>(current)) {
            this._subscribeChildModel(current);
          }
        });

        mapModelToSubscriptions.set(child, [$]);
      } else if (isModel<Item>(child)) {
        this._subscribeChildModel(child);
      }
    }
  }

  /**
   * Subscribe `valid$` and `value$` of the child
   * @param model
   */
  private _subscribeChildModel(model: BasicModel<Item>) {
    const { error$, _valid$, _value$, invalidModels } = this;
    if (_valid$) {
      this._subscribeObservable(model, model._getValid$(), valid => {
        if (valid) {
          invalidModels.delete(model);
        } else {
          invalidModels.add(model);
        }

        _valid$.next(!invalidModels.size && isNil(error$.value));
      });
    }

    if (_value$) {
      this._subscribeObservable(
        model,
        model._getValue$(),
        childValue => {
          const index = this.children.findIndex(it => {
            if (
              isModelRef<Item, FieldArrayModel<Item, Child>, BasicModel<Item>>(
                it
              )
            ) {
              return it.getModel() === model;
            } else if (isModel<Item>(it)) {
              return it === model;
            } else {
              throw createUnexpectedModelError(it);
            }
          });
          const copy = [..._value$.value];
          copy.splice(index, 1, childValue);
          _value$.next(copy);
        },
        true /** New value will be inserted in the observer of `children$`, skip the first subscription when inserting a new child */
      );
    }
  }

  /**
   * Subscribe a specified observable of the model
   * @param model as the key for mapping to subscription
   * @param observable
   * @param observer
   * @param skipFirst skip the first subscription
   */
  private _subscribeObservable<T>(
    model: BasicModel<Item>,
    observable: Observable<T>,
    observer: (value: T) => void,
    skipFirst?: boolean
  ) {
    const { mapModelToSubscriptions } = this;
    const $ = (skipFirst ? observable.pipe(skip(1)) : observable).subscribe(
      observer
    );
    const subs = mapModelToSubscriptions.get(model);
    if (subs) {
      subs.push($);
    } else {
      mapModelToSubscriptions.set(model, [$]);
    }
  }

  /**
   * Unsubscribe `valid$` and `value$` of the model
   * @param model
   */
  private _unsubscribeChild(child: Child) {
    let model: BasicModel<Item> | null = null;
    if (isModel<Item>(child)) {
      this.invalidModels.delete(child);
      model = child;
    } else if (isModelRef<Item, this, BasicModel<Item>>(child)) {
      model = child.getModel();
    }
    this._unsubscribeModel(child);
    if (model) {
      this._unsubscribeModel(model);
    }
  }

  private _disposeChild = (child: Child) => {
    this._unsubscribeChild(child);
    child.owner = null;
  };

  private _buildChild = (child: Item) => {
    const model = this.childFactory(child);
    this._subscribeChild(model);
    return model;
  };

  private _unsubscribeModel(model: IModel<Item>) {
    const subs = this.mapModelToSubscriptions.get(model);
    subs?.forEach(sub => sub.unsubscribe());
    this.mapModelToSubscriptions.delete(model);
    if (isModel<Item>(model)) {
      this.invalidModels.delete(model);
    }
  }
}

FieldArrayModel.prototype[FIELD_ARRAY_ID] = true;

export { FieldArrayModel };
