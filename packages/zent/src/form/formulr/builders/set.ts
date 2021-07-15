import { BasicBuilder, $GetBuilderModel } from './basic';
import type { $FieldSetValue } from '../models';
import { FieldSetModel } from '../models';
import { Maybe, Some, None, or } from '../maybe';
import {
  UnknownFieldSetModelChildren,
  UnknownFieldSetBuilderChildren,
} from '../utils';
import { hasOwnProperty } from '../../../utils/hasOwn';

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
  constructor(protected readonly _childBuilders: ChildBuilders) {
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
      if (hasOwnProperty(defaults, key)) {
        children[key] = childBuilder.build(Some(defaults[key]));
      } else {
        children[key] = childBuilder.build(None());
      }
    });
    const model = new FieldSetModel<$FieldSetBuilderChildren<ChildBuilders>>(
      children as $FieldSetBuilderChildren<ChildBuilders>
    );
    model.validators = this._validators;

    // Remove readonly modifier temporarily
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (model.builder as FieldSetBuilder<UnknownFieldSetBuilderChildren>) = this;

    return model;
  }

  /**
   * 获取名为 `name` 的 child builder 对象。
   */
  get<T extends keyof ChildBuilders>(name: T): ChildBuilders[T] {
    return this._childBuilders[name] as any;
  }
}
