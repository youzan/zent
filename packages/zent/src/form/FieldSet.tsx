import * as React from 'react';
import {
  useFieldSet,
  FormProvider,
  useValue$,
  BasicModel,
  IMaybeError,
  FieldSetModel,
  IValidators,
  $FieldSetValue,
  ModelRef,
  FieldArrayModel,
} from './formulr';
import {
  IRenderError,
  defaultRenderError,
  useFormChild,
  IFormFieldViewDrivenProps,
} from './shared';
import { useImperativeHandle } from 'react';

export interface IFieldSetBaseProps<
  T extends Record<string, BasicModel<unknown>>
> {
  /**
   * 表单提交时滚动到错误时的`DOM`元素的`ref`(来自`React.createRef`或`React.useRef`)
   */
  scrollAnchorRef?: React.RefObject<Element>;
  /**
   * 校验规则数组，按数组顺序执行，直到所有都通过或者在第一个失败的地方停止
   */
  validators?: IValidators<T>;
  children?: React.ReactNode;
  /**
   * 用于渲染整个 `FieldSet` 层面的错误
   */
  renderError?: IRenderError<T>;
  modelRef?: React.RefObject<FieldSetModel<T>>;
}

export interface IFieldSetModelDrivenProps<
  T extends Record<string, BasicModel<unknown>>
> extends IFieldSetBaseProps<T> {
  model:
    | FieldSetModel<T>
    | ModelRef<
        $FieldSetValue<T>,
        | FieldSetModel<Record<string, BasicModel<unknown>>>
        | FieldArrayModel<any, FieldSetModel<T>>,
        FieldSetModel<T>
      >;
}

export interface IFieldSetViewDrivenProps<
  T extends Record<string, BasicModel<unknown>>
>
  extends Omit<
      IFormFieldViewDrivenProps<$FieldSetValue<T>>,
      'defaultValue' | 'validators'
    >,
    IFieldSetBaseProps<T> {}

export function FieldSet<T extends Record<string, BasicModel<unknown>>>(
  props: IFieldSetModelDrivenProps<T> | IFieldSetViewDrivenProps<T>
) {
  const {
    scrollAnchorRef,
    renderError = defaultRenderError,
    validators,
    modelRef,
  } = props as IFieldSetBaseProps<T>;
  const { name } = props as IFieldSetViewDrivenProps<T>;
  const { model: rawModel } = props as IFieldSetModelDrivenProps<T>;
  const [ctx, model] = useFieldSet(name || rawModel, validators);
  useImperativeHandle(modelRef, () => model, [model]);
  useFormChild(model as BasicModel<unknown>, scrollAnchorRef);
  useValue$(model.error$, model.error$.getValue());
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error as IMaybeError<any>)}
    </FormProvider>
  );
}
