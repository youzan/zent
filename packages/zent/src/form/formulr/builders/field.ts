import { FieldModel, INormalizeBeforeSubmit } from '../models';
import { BasicBuilder } from './basic';
import { Maybe, or } from '../maybe';
import { id } from '../utils';

export class FieldBuilder<Value> extends BasicBuilder<
  Value,
  FieldModel<Value>
> {
  constructor(protected _defaultValue: Value) {
    super();
  }

  private _normalizeBeforeSubmit: INormalizeBeforeSubmit<Value, any> = id;

  normalizeBeforeSubmit<T>(
    normalizeBeforeSubmit: INormalizeBeforeSubmit<Value, T>
  ) {
    this._normalizeBeforeSubmit = normalizeBeforeSubmit;
  }

  build(defaultValue?: Maybe<Value>) {
    const model = new FieldModel(or(defaultValue, () => this._defaultValue));
    model.validators = this._validators;
    model.normalizeBeforeSubmit = this._normalizeBeforeSubmit;
    return model;
  }
}
