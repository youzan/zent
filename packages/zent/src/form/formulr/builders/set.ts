import { BasicBuilder, $GetBuilderModel } from './basic';
import { FieldSetModel, $FieldSetValue } from '../models';
import { Maybe, Some, None, or } from '../maybe';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from '../utils';

export type $FieldSetBuilderChildren<
  ChildBuilders extends UnknownFieldSetBuilderChildren
> = {
  [Key in keyof ChildBuilders]: $GetBuilderModel<ChildBuilders[Key]>;
};

export type $FieldSetBuilderDefaultValue<
  ChildBuilders extends UnknownFieldSetBuilderChildren
> = Partial<$FieldSetValue<$FieldSetBuilderChildren<ChildBuilders>>>;

export class FieldSetBuilder<
  ChildBuilders extends UnknownFieldSetBuilderChildren
> extends BasicBuilder<
  $FieldSetValue<$FieldSetBuilderChildren<ChildBuilders>>,
  FieldSetModel<$FieldSetBuilderChildren<ChildBuilders>>
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
        children[key] = childBuilder.build(None());
      }
    });
    const model = new FieldSetModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children as $FieldSetBuilderChildren<ChildBuilders>
    );
    model.validators = this._validators;
    return model;
  }
}
