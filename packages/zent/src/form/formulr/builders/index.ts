import { FieldArrayBuilder } from './array';
import { FieldBuilder } from './field';
import { FieldSetBuilder } from './set';
import { BasicBuilder } from './basic';
import { FormBuilder } from './form';
import { UnknownFieldSetBuilderChildren } from '../utils';

export * from './array';
export * from './field';
export * from './set';
export * from './form';
export * from './basic';

/**
 * 创建一个 `Field` builder
 * @param defaultValue `Field` 的默认值
 */
export function field<T>(defaultValue: T) {
  return new FieldBuilder(defaultValue);
}

/**
 * 创建一个 `FieldArray` builder
 * @param childBuilder 数组元素的 builder 对象，可以是 `field`、`array` 或者 `set` 的返回值
 */
export function array<ChildBuilder extends BasicBuilder<any, any>>(
  childBuilder: ChildBuilder
) {
  return new FieldArrayBuilder<ChildBuilder>(childBuilder);
}

/**
 * 创建一个 `FieldSet` builder
 * @param childBuilders `FieldSet` 每个字段对应的 builder 对象，其值可以是 `field`、`array` 或者 `set` 的返回值
 */
export function set<ChildBuilders extends UnknownFieldSetBuilderChildren>(
  childBuilders: ChildBuilders
) {
  return new FieldSetBuilder<ChildBuilders>(childBuilders);
}

/**
 * 创建一个 `Form` builder，是最顶层的 builder 对象
 * @param childBuilders `Form` 每个字段对应的 builder 对象，其值可以是 `field`、`array` 或者 `set` 的返回值
 */
export function form<ChildBuilders extends UnknownFieldSetBuilderChildren>(
  childBuilders: ChildBuilders
) {
  return new FormBuilder<ChildBuilders>(childBuilders);
}
