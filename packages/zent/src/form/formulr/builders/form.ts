import { BasicBuilder } from './basic';
import { $FieldSetValue, FormModel } from '../models';
import { $FieldSetBuilderChildren, $FieldSetBuilderDefaultValue } from './set';
import { Maybe, Some, or } from '../maybe';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from '../utils';

export class FormBuilder<
  ChildBuilders extends UnknownFieldSetBuilderChildren
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
    const children = {} as UnknownFieldSetModelChildren;
    Object.keys(this._childBuilders).forEach(key => {
      const childBuilder = this._childBuilders[key];
      if (defaults.hasOwnProperty(key)) {
        children[key] = childBuilder.build(Some(defaults[key]));
      } else {
        children[key] = childBuilder.build(null);
      }
    });
    const model = new FormModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children as $FieldSetBuilderChildren<ChildBuilders>
    );
    model.validators = this._validators;
    return model;
  }
}
