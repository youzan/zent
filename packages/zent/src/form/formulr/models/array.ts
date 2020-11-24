import { BehaviorSubject, Observable, Subscription, asapScheduler } from 'rxjs';
import { BasicModel, isModel } from './basic';
import { ValidateOption } from '../validate';
import { isModelRef, ModelRef } from './ref';
import { BasicBuilder } from '../builders/basic';
import { or, Some } from '../maybe';
import { IModel } from './base';
import isNil from '../../../utils/isNil';
import uniqueId from '../../../utils/uniqueId';
import { observeOn, pairwise, skip } from 'rxjs/operators';
import { createUnexpectedModelError, NullModelReferenceError } from '../error';
import {
  unstable_IdlePriority as IdlePriority,
  unstable_scheduleCallback as scheduleCallback,
} from 'scheduler';

const FIELD_ARRAY_ID = Symbol('field-array');

class FieldArrayModel<
  Item,
  Child extends IModel<Item> = IModel<Item>
> extends BasicModel<readonly Item[]> {
  /**
   * @internal
   */
  [FIELD_ARRAY_ID]!: boolean;

  readonly children$: BehaviorSubject<Child[]>;

  owner: IModel<any> | null = null;

  readonly value$: BehaviorSubject<readonly Item[]>;

  private readonly invalidModels: Set<BasicModel<Item>> = new Set();

  private readonly mapModelToSubscriptions: Map<
    IModel<any>,
    Subscription[]
  > = new Map();

  private readonly childFactory: (defaultValue: Item) => Child;

  /** @internal */
  constructor(
    childBuilder: BasicBuilder<Item, Child> | null,
    private readonly defaultValue: readonly Item[]
  ) {
    super(uniqueId('field-array-'));
    this.value$ = new BehaviorSubject(defaultValue);
    this.childFactory = childBuilder
      ? (defaultValue: Item) => {
          const child = childBuilder.build(Some(defaultValue));
          child.owner = this;
          return child;
        }
      : (defaultValue: Item) =>
          (new ModelRef<Item, FieldArrayModel<Item, Child>, Child>(
            null,
            Some(defaultValue),
            this
          ) as unknown) as Child;
    const children = this.defaultValue.map(this._buildChild);
    const $ = this.error$.subscribe(maybeError => {
      const selfValid = isNil(maybeError);
      this.valid$.next(selfValid && !this.invalidModels.size);
    });
    this.mapModelToSubscriptions.set(this, [$]);
    this.children$ = new BehaviorSubject(children);
    this.children$
      .pipe(
        /** Skip the first subscription to avoid setting `defaultValue` repeatedly  */
        skip(1)
      )
      .subscribe(() => {
        /** Waiting `setModel` in `render` of child component(s), or `getRawValue` will throw `NullModelReferenceError` */
        scheduleCallback(IdlePriority, () => {
          this.value$.next(this.getRawValue());
        });
      });
  }

  /**
   * 重置 `FieldArray` 为初始值，初始值通过 `initialize` 设置；如果初始值不存在就使用默认值
   */
  reset() {
    const children = or(this.initialValue, () => this.defaultValue).map(
      this.childFactory
    );
    this.children$.next(children);
  }

  /**
   * 清除 `FieldArray` 的初始值，并将当前值设置为默认值
   */
  clear() {
    this.initialValue = undefined;
    const children = this.defaultValue.map(this.childFactory);
    this.children$.next(children);
  }

  /**
   * 获取 `FieldArray` 内的所有 model
   */
  get children(): ReadonlyArray<Child> {
    return this.children$.getValue();
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
    const children = values.map(this.childFactory);
    this.children$.next(children);
  }

  /**
   * 添加一批元素到 `FieldArray` 的末尾
   * @param items 待添加的值
   */
  push(...items: Item[]) {
    const nextChildren = this.children$
      .getValue()
      .concat(items.map(this._buildChild));
    this.children$.next(nextChildren);
  }

  /**
   * 删除 `FieldArray` 最后的一个元素
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
   * @param items 待添加的值·
   */
  unshift(...items: Item[]) {
    const nextChildren = items
      .map(this._buildChild)
      .concat(this.children$.getValue());
    this.children$.next(nextChildren);
  }

  /**
   * 在 `FieldArray` 的指定位置删除指定数量的元素，并添加指定的新元素
   * @param start 开始删除的元素位置
   * @param deleteCount 删除的元素个数
   * @param items 待添加的元素值
   */
  splice(start: number, deleteCount = 0, ...items: readonly Item[]): Child[] {
    const children = this.children$.getValue().slice();
    const insertedChildren = items.map(this._buildChild);
    const removedChildren = children.splice(
      start,
      deleteCount,
      ...insertedChildren
    );
    this.children$.next(children);
    removedChildren.forEach(this._disposeChild);
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
  }

  /**
   * Base method for gettting value from array model
   * @param getter map model to value
   */
  private _getValue<V>(getter: (model: BasicModel<Item>) => V): V[] {
    return this.children$.getValue().map(child => {
      if (isModelRef<Item, this, BasicModel<Item>>(child)) {
        const model = child.getModel();
        if (model) {
          return getter(model);
        }
        throw NullModelReferenceError;
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
    const { mapModelToSubscriptions } = this;
    if (isModelRef<Item, FieldArrayModel<Item, Child>, Child>(child)) {
      const $ = child.model$.pipe(pairwise()).subscribe(pair => {
        const [prev, current] = pair;

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

  /**
   * Subscribe `valid$` and `value$` of the child
   * @param model
   */
  private _subscribeChildModel(model: BasicModel<Item>) {
    const { error$, valid$, value$, invalidModels } = this;
    this._subscribeObservable(model, model.valid$, valid => {
      if (valid) {
        invalidModels.delete(model);
      } else {
        invalidModels.add(model);
      }

      valid$.next(!invalidModels.size && isNil(error$.value));
    });

    this._subscribeObservable(
      model,
      model.value$,
      childValue => {
        const index = this.children.findIndex(it => {
          if (
            isModelRef<Item, FieldArrayModel<Item, Child>, BasicModel<Item>>(it)
          ) {
            return it.getModel() === model;
          } else if (isModel<Item>(it)) {
            return it === model;
          } else {
            throw createUnexpectedModelError(it);
          }
        });
        const copy = [...value$.value];
        copy.splice(index, 1, childValue);
        value$.next(copy);
      },
      true /** New value will be inserted in the observer of `children$`, skip the first subscription when inserting a new child */
    );
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
    const operators = [observeOn(asapScheduler)];
    if (skipFirst) {
      operators.push(skip(1));
    }
    const $ = observable.pipe.apply(observable, operators).subscribe(observer);
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

function isFieldArrayModel<Item, Child extends IModel<Item> = IModel<Item>>(
  maybeModel: any
): maybeModel is FieldArrayModel<Item, Child> {
  return !!(maybeModel && maybeModel[FIELD_ARRAY_ID]);
}

export { FieldArrayModel, isFieldArrayModel };
