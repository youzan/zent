import { BehaviorSubject } from 'rxjs';
import { BasicModel, isModel } from './basic';
import { ValidateOption } from '../validate';
import { isModelRef, ModelRef } from './ref';
import { BasicBuilder } from '../builders/basic';
import { or, Some } from '../maybe';
import UniqueId from '../unique-id';
import { IModel } from './base';
import isNil from '../../../utils/isNil';

const FIELD_ARRAY_ID = Symbol('field-array');

const uniqueId = new UniqueId('field-array');

class FieldArrayModel<
  Item,
  Child extends IModel<Item> = IModel<Item>
> extends BasicModel<readonly Item[]> {
  /**
   * @internal
   */
  [FIELD_ARRAY_ID]!: boolean;

  readonly children$: BehaviorSubject<Child[]>;

  private readonly childFactory: (defaultValue: Item) => Child;

  owner: IModel<any> | null = null;

  /** @internal */
  constructor(
    childBuilder: BasicBuilder<Item, Child> | null,
    private readonly defaultValue: readonly Item[]
  ) {
    super(uniqueId.get());
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
    const children = this.defaultValue.map(this.childFactory);
    this.children$ = new BehaviorSubject(children);
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
  get children() {
    return this.children$.getValue();
  }

  /**
   * `FieldArray` 内所有 model 是否都通过了校验
   */
  valid() {
    if (!isNil(this.error$.getValue())) {
      return false;
    }
    const children = this.children$.getValue();
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (isModelRef(child)) {
        const model = child.getModel();
        if (!model || !model.valid()) {
          return false;
        }
      } else if (isModel(child) && !child.valid()) {
        return false;
      }
    }
    return true;
  }

  /**
   * 获取 `FieldArray` 内的原始值
   */
  getRawValue(): (Item | null)[] {
    return this.children$.getValue().map(child => {
      if (isModelRef<Item, this, Child>(child)) {
        const model = child.getModel();
        return model ? model.getRawValue() : null;
      } else if (isModel<Item>(child)) {
        return child.getRawValue();
      }
      return null;
    });
  }

  /**
   * 获取 `FieldArray` 的用于表单提交的值，和原始值可能不一致
   */
  getSubmitValue(): (Item | null)[] {
    return this.children$.getValue().map(child => {
      if (isModelRef<Item, this, Child>(child)) {
        const model = child.getModel();
        return model ? model.getSubmitValue() : null;
      } else if (isModel<Item>(child)) {
        return child.getSubmitValue();
      }
      return null;
    });
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
    const nextChildren: Child[] = this.children$
      .getValue()
      .concat(items.map(this.childFactory));
    this.children$.next(nextChildren);
  }

  /**
   * 删除 `FieldArray` 最后的一个元素
   */
  pop() {
    const children = this.children$.getValue().slice();
    const child = children.pop();
    if (child) {
      child.owner = null;
    }
    this.children$.next(children);
    return child;
  }

  /**
   * 删除 `FieldArray` 第一个元素
   */
  shift() {
    const children = this.children$.getValue().slice();
    const child = children.shift();
    if (child) {
      child.owner = null;
    }
    this.children$.next(children);
    return child;
  }

  /**
   * 在 `FieldArray` 开头添加值
   * @param items 待添加的值·
   */
  unshift(...items: Item[]) {
    const nextChildren = items
      .map(this.childFactory)
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
    const insertedChildren = items.map(this.childFactory);
    const removedChildren = children.splice(
      start,
      deleteCount,
      ...insertedChildren
    );
    this.children$.next(children);
    removedChildren.forEach(child => {
      if (child) {
        child.owner = null;
      }
    });
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
      child.dispose();
    });
    this.children$.next([]);
  }
}

FieldArrayModel.prototype[FIELD_ARRAY_ID] = true;

function isFieldArrayModel<Item, Child extends IModel<Item> = IModel<Item>>(
  maybeModel: any
): maybeModel is FieldArrayModel<Item, Child> {
  return !!(maybeModel && maybeModel[FIELD_ARRAY_ID]);
}

export { FieldArrayModel, isFieldArrayModel };
