import * as React from 'react';
import {
  FieldModel,
  IValidators,
  IMaybeError,
  BasicModel,
  ValidateOption,
} from 'formulr';
import { useRef, ReactNode, RefObject } from 'react';
import { Omit, Optional } from 'utility-types';
import { FormError } from './Error';
import { IFormControlProps } from './Control';
import { useFormContext, IFormChild } from './context';
import { DatePickers } from '../datetimepicker/common/types';
import { $MergeParams } from './utils';

export interface IRenderError<T> {
  (error: IMaybeError<T>): ReactNode;
}

export interface IFormFieldViewDrivenProps<T> {
  /**
   * 表单项对应的数据字段名
   */
  name: string;
  /**
   * 默认值
   */
  defaultValue: T | (() => T);
  /**
   * 校验规则列表，执行的时候会按数组顺序逐个调用，直到所有都通过或者在第一个失败的地方停止
   */
  validators?: IValidators<T>;
  /**
   * 是否在组件 `unmount` 的时候清除数据
   * @defaultValue `false`
   */
  destroyOnUnmount?: boolean;
}

export interface IFormFieldModelDrivenProps<T> {
  /**
   * 表单项对应的数据
   */
  model: FieldModel<T>;
}

export type IFormFieldModelProps<T> =
  | IFormFieldViewDrivenProps<T>
  | IFormFieldModelDrivenProps<T>;

export function isViewDrivenProps<T>(
  props: IFormFieldModelProps<T>
): props is IFormFieldViewDrivenProps<T> {
  return !!(props as $MergeParams<typeof props>).name;
}

// prettier-ignore
export enum ValidateOccasion {
  /**
   * 不触发校验
   */
  None      =     0b0000,
  /**
   * 值改变的时候触发校验
   */
  Change    =     0b0001,
  /**
   * `blur` 事件发生的时候触发校验
   */
  Blur      =     0b0010,
  /**
   * 组件使用的默认值。⚠️不要在业务代码中强依赖这个值的行为，这是内部实现，随时会调整。
   */
  Default   =     Change | Blur,
}

export enum TouchWhen {
  /**
   * 值改变的时候标记 `touched` 状态
   */
  Change,
  /**
   * `blur` 事件发生的时候标记 `touched` 状态
   */
  Blur,
}

export interface IFormFieldPropsBase<Value>
  extends Omit<IFormControlProps, 'required' | 'invalid'> {
  /**
   * 自定义错误渲染，参数是 `validator` 返回的对象，一次只会有一个错误
   */
  renderError?: IRenderError<Value>;
  /**
   * 表单项说明文案
   */
  helpDesc?: React.ReactNode;
  /**
   * 表单项警示性文案
   */
  notice?: React.ReactNode;
  /**
   * 设置不显示错误
   */
  withoutError?: boolean;
  /**
   * 在表单项前面显示的自定义内容
   */
  before?: React.ReactNode;
  /**
   * 在表单项后面显示的自定义内容
   */
  after?: React.ReactNode;
  /**
   * 是否必填，如果这项有值，会在校验规则里添加一个 `required` 规则
   */
  required?: boolean | string;
  /**
   * 什么时候触发校验
   * @defaultValue `ValidateOccasion.Change | ValidateOccasion.Blur`
   */
  validateOccasion?: ValidateOccasion;
  /**
   * 触发onChange时会先经过 `normalize` 再写入到内部的 `model `上
   */
  normalize?: (value: Value, prevValue: Value) => Value;
  /**
   * 渲染前会先经过 `format`
   */
  format?: (value: Value) => Value;
  /**
   * 根据触发校验的源头获取校验规则
   *
   * @param source - 校验触发的来源
   * @returns 校验规则执行的选项 https://zent-contrib.github.io/formulr/enums/validateoption.html
   */
  getValidateOption?: (
    source: 'blur' | 'change'
  ) => ValidateOption | null | undefined;
  modelRef?: React.RefObject<FieldModel<Value>>;
  /**
   * 什么时候标记表单项为 `touched`
   * @defaultValue `TouchWhen.Change`
   */
  touchWhen?: TouchWhen;
}

export type IFormFieldProps<Value> = IFormFieldPropsBase<Value> &
  IFormFieldModelProps<Value> & {
    children(props: IFormFieldChildProps<Value>): React.ReactNode;
  };

export type IFormComponentProps<
  Value,
  Props,
  OmitKeys extends keyof IFormFieldPropsBase<Value> = never
> = (Omit<IFormFieldPropsBase<Value>, 'touchWhen' | OmitKeys> & {
  props?: Partial<Props>;
}) &
  (
    | Optional<IFormFieldViewDrivenProps<Value>, 'defaultValue'>
    | IFormFieldModelDrivenProps<Value>
  );

export function dateDefaultValueFactory(): DatePickers.Value {
  return new Date();
}

export function dateRangeDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export function defaultRenderError<T>(error: IMaybeError<T>) {
  if (error == null) {
    return null;
  }
  return <FormError>{error.message}</FormError>;
}

export function asFormChild<Value>(
  model: BasicModel<Value>,
  scrollAnchorRef?: RefObject<Element | null | undefined>
) {
  const ctx = useFormContext();
  const posRef = useRef(ctx.children.length);
  React.useEffect(() => {
    const formChild: IFormChild = {
      valid() {
        return model.valid();
      },
      getDOMNode() {
        return scrollAnchorRef && scrollAnchorRef.current;
      },
    };
    if (posRef.current < ctx.children.length) {
      ctx.children.splice(posRef.current, 0, formChild);
    } else {
      posRef.current = ctx.children.length;
      ctx.children.push(formChild);
    }
    return () => {
      const pos = ctx.children.indexOf(formChild);
      if (pos !== -1) {
        posRef.current = pos;
        ctx.children.splice(pos, 1);
      }
    };
  }, [model, scrollAnchorRef, ctx]);
}

export interface IFormFieldChildProps<Value> {
  value: Value;
  onChange(e: Value): void;
  onBlur: React.FocusEventHandler;
  onCompositionStart: React.CompositionEventHandler;
  onCompositionEnd: React.CompositionEventHandler;
}
