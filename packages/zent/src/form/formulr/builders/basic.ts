import { IModel } from '../models/base';
import { IValidators } from '../validate';
import { Maybe } from '../maybe';

export abstract class BasicBuilder<Value, Model extends IModel<Value>> {
  /**
   * @internal
   */
  readonly phantomValue!: Value;
  /**
   * @internal
   */
  readonly phantomModel!: Model;
  protected _validators: IValidators<Value> = [];

  abstract build(defaultValue?: Maybe<Value>): Model;

  /**
   * 设置 builder 上的校验规则
   * @param validators 校验规则
   */
  validators(...validators: IValidators<Value>) {
    this._validators = validators;
    return this;
  }
}
