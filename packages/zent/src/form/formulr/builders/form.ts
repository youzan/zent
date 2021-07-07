import { FormModel } from '../models';
import {
  $FieldSetBuilderChildren,
  $FieldSetBuilderDefaultValue,
  FieldSetBuilder,
} from './set';
import { Maybe, Some, or } from '../maybe';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from '../utils';
import { hasOwnProperty } from '../../../utils/hasOwn';

export class FormBuilder<
  ChildBuilders extends UnknownFieldSetBuilderChildren
> extends FieldSetBuilder<ChildBuilders> {
  build(defaultValues?: Maybe<$FieldSetBuilderDefaultValue<ChildBuilders>>) {
    const defaults = or<$FieldSetBuilderDefaultValue<ChildBuilders>>(
      defaultValues,
      () => ({})
    );
    const children = {} as UnknownFieldSetModelChildren;
    Object.keys(this._childBuilders).forEach(key => {
      const childBuilder = this._childBuilders[key];
      if (hasOwnProperty(defaults, key)) {
        children[key] = childBuilder.build(Some(defaults[key]));
      } else {
        children[key] = childBuilder.build(null);
      }
    });
    const model = new FormModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children as $FieldSetBuilderChildren<ChildBuilders>
    );
    model.validators = this._validators;

    // Remove readonly modifier temporarily
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (model.builder as FormBuilder<UnknownFieldSetBuilderChildren>) = this;

    return model;
  }
}
