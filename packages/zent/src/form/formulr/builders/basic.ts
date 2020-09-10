import { IModel } from '../models/base';
import { IValidators } from '../validate';
import { Maybe } from '../maybe';
import { UnknownObject } from '../utils';

export type $GetBuilderValue<T> = T extends BasicBuilder<infer V, infer _>
  ? V
  : never;

export type $GetBuilderModel<T> = T extends BasicBuilder<infer _, infer M>
  ? M
  : never;

export abstract class BasicBuilder<Value, Model extends IModel<Value>> {
  protected _validators: IValidators<Value> = [];

  abstract build(
    defaultValue?: Maybe<Value extends UnknownObject ? Partial<Value> : Value>
  ): Model;

  /**
   * 设置 builder 上的校验规则
   * @param validators 校验规则
   */
  validators(...validators: IValidators<Value>) {
    this._validators = validators;
    return this;
  }
}
