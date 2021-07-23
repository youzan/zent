import { BehaviorSubject, Observable } from 'rxjs';
import { FieldSetModel } from './set';
import { ValidateOption } from '../validate';
import uniqueId from '../../../utils/uniqueId';
import type {
  UnknownFieldSetBuilderChildren,
  UnknownFieldSetModelChildren,
} from '../utils';
import { FORM_ID } from './is';
import type { FormBuilder } from '../builders/form';
import { createSentinelSubject } from './sentinel-subject';

enum FormStrategy {
  /**
   * 指定 model 模式
   */
  Model,

  /**
   * 视图驱动模式
   */
  View,
}

class FormModel<
  Children extends UnknownFieldSetModelChildren = UnknownFieldSetModelChildren
> extends FieldSetModel<Children> {
  /**
   * @internal
   */
  [FORM_ID]!: boolean;

  protected readonly _displayName = 'FormModel';

  /** @internal */
  private readonly workingValidators = new Set<Observable<unknown>>();
  readonly isValidating$ = new BehaviorSubject(false);

  readonly owner = this;

  /**
   * 当前 `FormModel` 对象的 builder 对象，仅在 `Model` 模式下可用。
   */
  readonly builder?: FormBuilder<UnknownFieldSetBuilderChildren>;

  get form() {
    return this as unknown as FormModel;
  }

  constructor(readonly children: Children) {
    super(children, uniqueId('form-'));
    const keys = Object.keys(children);
    const keysLength = keys.length;
    for (let index = 0; index < keysLength; index++) {
      const name = keys[index];
      const child = children[name];
      this.registerChild(name, child);
    }
  }

  /**
   * 执行整个 `Form` 的校验，默认会递归触发所有表单元素的校验
   * @param option 表单校验的参数
   */
  validate(
    option: ValidateOption = ValidateOption.Default |
      ValidateOption.IncludeChildrenRecursively
  ) {
    return super.validate(option);
  }

  /** @internal */
  addWorkingValidator(v: Observable<unknown>) {
    this.workingValidators.add(v);
    this.updateIsValidating();
  }

  /** @internal */
  removeWorkingValidator(v: Observable<unknown>) {
    this.workingValidators.delete(v);
    this.updateIsValidating();
  }

  /** @internal */
  private updateIsValidating() {
    const isValidating = this.workingValidators.size > 0;
    if (isValidating !== this.isValidating$.getValue()) {
      this.isValidating$.next(isValidating);
    }
  }

  dispose() {
    super.dispose();

    this.workingValidators.clear();
    this.isValidating$.complete();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (this.isValidating$ as BehaviorSubject<boolean>) = createSentinelSubject(
      this._displayName,
      false
    );
  }
}

FormModel.prototype[FORM_ID] = true;

export { FormStrategy, FormModel };
