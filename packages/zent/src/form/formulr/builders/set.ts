import { BasicBuilder } from './basic';
import { FieldSetModel, $FieldSetValue } from '../models';
import { Maybe, Some, None, or } from '../maybe';

export type $FieldSetBuilderChildren<
  ChildBuilders extends Record<string, BasicBuilder<any, any>>
> = {
  [Key in keyof ChildBuilders]: ChildBuilders[Key]['phantomModel'];
};

export type $FieldSetBuilderDefaultValue<
  ChildBuilders extends Record<string, BasicBuilder<any, any>>
> = Partial<$FieldSetValue<$FieldSetBuilderChildren<ChildBuilders>>>;

export class FieldSetBuilder<
  ChildBuilders extends Record<string, BasicBuilder<any, any>>
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
    const children = {} as $FieldSetBuilderChildren<ChildBuilders>;
    Object.keys(this._childBuilders).forEach((key: keyof ChildBuilders) => {
      const childBuilder = this._childBuilders[key];
      if (defaults.hasOwnProperty(key)) {
        children[key] = childBuilder.build(Some(defaults[key]));
      } else {
        children[key] = childBuilder.build(None());
      }
    });
    const model = new FieldSetModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children
    );
    model.validators = this._validators;
    return model;
  }
}
