import { IMaybeError, IValidators, ValidateOption } from '../validate';
import { FormModel } from './form';

export interface IModel<Value> {
  getRawValue(): any;
  getSubmitValue(): any;
  pristine(): boolean;
  touched(): boolean;
  dirty(): boolean;
  valid(): boolean;
  patchValue(value: Value): void;
  validate(strategy: ValidateOption): Promise<any>;
  reset(): void;
  clear(): void;
  initialize(value: Value): void;
  error: IMaybeError<Value>;
  owner: IModel<any> | null;
  form: FormModel<any> | null | undefined;
  dispose(): void;
  validators: IValidators<Value>;
}
