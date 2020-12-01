import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import {
  ErrorSubscriber,
  IMaybeError,
  IValidation,
  IValidators,
  validate,
  ValidateOption,
} from '../validate';
import { switchMap } from 'rxjs/operators';
import { Maybe, None } from '../maybe';
import { IModel } from './base';

const MODEL_ID = Symbol('model');

abstract class BasicModel<Value> implements IModel<Value> {
  /**
   * @internal
   */
  readonly validate$ = new Subject<IValidation>();
  /**
   * @internal
   *
   * 校验规则数组
   */
  validators: IValidators<Value> = [];
  /**
   * @internal
   *
   * 初始值
   */
  initialValue: Maybe<Value> = None();

  /**
   * 组件 unmount 的时候删除 model
   */
  destroyOnUnmount = false;

  private subscriptions: Subscription[] = [];

  abstract owner: IModel<any> | null;

  /** @internal */
  [MODEL_ID]!: boolean;

  abstract getRawValue(): Value;
  abstract getSubmitValue(): any;

  readonly error$ = new BehaviorSubject<IMaybeError<Value>>(null);

  abstract get valid$(): BehaviorSubject<boolean>;

  abstract get value$(): BehaviorSubject<Value>;

  get value() {
    return this.value$.value;
  }

  set value(value: Value) {
    this.patchValue(value);
  }

  get form() {
    return this.owner?.form;
  }

  protected constructor(readonly id: string) {
    this.subscriptions.push(
      this.validate$
        .pipe(switchMap(validate(this)))
        .subscribe(new ErrorSubscriber(this))
    );
  }

  abstract pristine(): boolean;
  abstract touched(): boolean;
  abstract dirty(): boolean;
  abstract patchValue(value: Value): void;
  abstract reset(): void;
  abstract clear(): void;
  abstract initialize(value: Value): void;
  abstract validate(option?: ValidateOption): Promise<any>;

  dispose() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
    this.owner = null;
  }

  valid() {
    return this.valid$.value;
  }

  protected triggerValidate(option: ValidateOption) {
    /**
     * FormModel的owner是它自身
     */
    if (this.owner !== this && !(option & ValidateOption.StopPropagation)) {
      const parentOption = option & ~ValidateOption.IncludeChildrenRecursively;
      this.owner?.validate(parentOption);
    }
    return new Promise<IMaybeError<Value>>((resolve, reject) => {
      this.validate$.next({
        option,
        resolve,
        reject,
      });
    });
  }

  /**
   * 获取 model 上的错误信息
   */
  get error() {
    return this.error$.getValue();
  }

  /**
   * 设置 model 上的错误信息
   */
  set error(error: IMaybeError<Value>) {
    this.error$.next(error);
  }
}

BasicModel.prototype[MODEL_ID] = true;

function isModel<T>(maybeModel: any): maybeModel is BasicModel<T> {
  return Boolean(maybeModel?.[MODEL_ID]);
}

export { BasicModel, isModel };
