import { IModel } from '../models/base';
import { IValidators } from '../validate';

export type $GetBuilderValue<T> = T extends BasicBuilder<infer V, infer _>
  ? V
  : never;

export type $GetBuilderModel<T> = T extends BasicBuilder<infer _, infer M>
  ? M
  : never;

export abstract class BasicBuilder<Value, Model extends IModel<Value>> {
  protected _validators: IValidators<Value> = [];

  abstract build(defaultValue?: unknown): Model;

  /**
   * 设置 builder 上的校验规则
   * @param validators 校验规则
   */
  validators(...validators: IValidators<Value>) {
    this._validators = validators;
    return this;
  }
}
