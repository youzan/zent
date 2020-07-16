import { BasicBuilder } from './basic';
import { $FieldSetValue, FormModel, BasicModel } from '../models';
import { $FieldSetBuilderChildren, $FieldSetBuilderDefaultValue } from './set';
import { Maybe, Some, or } from '../maybe';

export class FormBuilder<
  ChildBuilders extends Record<string, Builder>,
  Builder extends BasicBuilder<unknown, Model>,
  Model extends BasicModel<unknown>
> extends BasicBuilder<
  $FieldSetValue<$FieldSetBuilderChildren<ChildBuilders>>,
  FormModel<$FieldSetBuilderChildren<ChildBuilders>>
> {
  constructor(private readonly _childBuilders: ChildBuilders) {
    super();
  }

  build(defaultValues?: Maybe<$FieldSetBuilderDefaultValue<ChildBuilders>>) {
    const defaults = or<$FieldSetBuilderDefaultValue<ChildBuilders>>(
      defaultValues,
      () => ({})
    );
    const children = {} as $FieldSetBuilderChildren<ChildBuilders>;
    Object.keys(this._childBuilders).forEach((key: keyof ChildBuilders) => {
      const childBuilder = this._childBuilders[key];
      if (defaults.hasOwnProperty(key)) {
        children[key] = childBuilder.build(Some(defaults[key]));
      } else {
        children[key] = childBuilder.build(null);
      }
    });
    const model = new FormModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children
    );
    model.validators = this._validators;
    return model;
  }
}
