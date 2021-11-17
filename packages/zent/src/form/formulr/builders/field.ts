import { FieldModel } from '../models';
import { BasicBuilder } from './basic';
import { Maybe, or } from '../maybe';

export class FieldBuilder<Value> extends BasicBuilder<
  Value,
  FieldModel<Value>
> {
  constructor(protected _defaultValue: Value) {
    super();
  }

  build(defaultValue?: Maybe<Value>) {
    const model = new FieldModel(or(defaultValue, () => this._defaultValue));
    model.validators = this._validators;
    model.normalizeBeforeSubmit = this._normalizeBeforeSubmit;

    // Remove readonly modifier temporarily
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (model.builder as FieldBuilder<Value>) = this;

    return model;
  }
}
