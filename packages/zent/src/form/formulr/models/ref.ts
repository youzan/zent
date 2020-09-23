import { BehaviorSubject } from 'rxjs';
import { IModel } from './base';
import { ValidateOption, IMaybeError, IValidators } from '../validate';
import { Maybe, None } from '../maybe';
import uniqueId from '../../../utils/uniqueId';

const REF_ID = Symbol('ref');

class ModelRef<Value, Parent extends IModel<any>, Model extends IModel<Value>>
  implements IModel<Value> {
  /**
   * @internal
   */
  [REF_ID]!: boolean;

  /**
   * @internal
   */
  patchedValue: Maybe<Value> = None();

  id = uniqueId('model-ref-');

  model$: BehaviorSubject<Model | null>;

  private _owner: IModel<any> | null = null;

  get owner(): IModel<any> | null {
    return this._owner;
  }

  set owner(owner: IModel<any> | null) {
    this._owner = owner;
    const model = this.getModel();
    if (model) {
      model.owner = owner;
    }
  }

  get form() {
    return this.owner?.form;
  }

  /**
   * @internal
   */
  constructor(
    current: Model | null = null,
    public initialValue: Maybe<Value> = None(),
    owner: Parent | null
  ) {
    this.model$ = new BehaviorSubject(current);
    this.owner = owner;
  }

  get validators(): IValidators<Value> {
    return this.model$.getValue()?.validators ?? [];
  }

  set validators(validators: IValidators<Value>) {
    const model = this.model$.getValue();
    if (model) {
      model.validators = validators;
    }
  }

  getModel() {
    return this.model$.getValue();
  }

  setModel(model: Model | null) {
    const current = this.getModel();
    if (current) {
      current.dispose();
    }
    if (model) {
      model.owner = this.owner;
    }
    this.model$.next(model);
  }

  getParent() {
    return this.owner;
  }

  dirty() {
    const current = this.getModel();
    if (!current) {
      return false;
    }
    return current.dirty();
  }

  touched() {
    const current = this.getModel();
    if (!current) {
      return false;
    }
    return current.touched();
  }

  validate(option: ValidateOption = ValidateOption.Default): Promise<void> {
    const current = this.getModel();
    if (!current) {
      return Promise.resolve();
    }
    return current.validate(option);
  }

  getRawValue(): Value | null {
    return this.getModel()?.getRawValue();
  }

  pristine() {
    const current = this.getModel();
    if (current) {
      return current.pristine();
    }
    return true;
  }

  valid() {
    const current = this.getModel();
    if (current) {
      return current.valid();
    }
    return true;
  }

  get error() {
    return this.getModel()?.error;
  }

  set error(error: IMaybeError<Value>) {
    const current = this.getModel();
    if (current) {
      current.error = error;
    }
  }

  patchValue(value: Value) {
    this.getModel()?.patchValue(value);
  }

  initialize(value: Value) {
    this.getModel()?.initialize(value);
  }

  reset() {
    this.getModel()?.reset();
  }

  clear() {
    this.getModel()?.clear();
  }

  dispose() {
    this.getModel()?.dispose();
    this.model$.next(null);
  }

  getSubmitValue() {
    this.getModel()?.getSubmitValue();
  }
}

ModelRef.prototype[REF_ID] = true;

function isModelRef<T, P extends IModel<any>, M extends IModel<T>>(
  maybeModelRef: any
): maybeModelRef is ModelRef<T, P, M> {
  return !!(maybeModelRef && maybeModelRef[REF_ID]);
}

export { ModelRef, isModelRef };
